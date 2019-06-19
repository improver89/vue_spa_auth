<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Response;
use App\Library\Services\Contracts\SmsSenderServiceInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UsersController extends Controller
{
    /**
     * Adds user
     *
     * Request JSON Object:
     *
     * login (string) – User’s login (required)
     * password (string) – User’s password (required)
     * role (integer) – Type of user (required)
     * enabled (boolean) - Is User enabled (required)
     * note (string) – User’s description (required)
     *
     * Response JSON Object:
     * status (string) - If user is created you'll get 'success', if not created you'll get 'error'
     * errors (string) - Validation errors
     *
     * Status Codes:
     * 200 OK
     *
     * @param $request \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $v = Validator::make($request->json()->all(), [
            'login' => 'required|unique:users',
            'password' => 'required|min:8|confirmed',
            'role' => 'required|string',
            'enabled' => 'required|boolean',
            'note' => 'required|string'
        ]);
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 200);
        }
        $user = new User;
        $user->login = $request->login;
        $user->password = bcrypt($request->password);
        $user->role = $request->role;
        $user->enabled = $request->enabled;
        $user->note = $request->note;

        try {
            $user->save();
            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }
    }

    /**
     * Removes user
     *
     * Query Parameters
     * login (string) – User login
     *
     * Response JSON Object:
     * status (string) - If user is deleted you'll get 'success', if not deleted you'll get 'error'
     * errors (string) - Validation errors
     *
     * @param $request \Illuminate\Http\Request
     * @param $login string
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, $login)
    {
        $v = $validator = Validator::make(
            array('login' => $login),
            array('login' => 'required|exists:users')
        );
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 200);
        }
        $user = User::whereLogin($login)->take(1)->get()[0];
        try {
            $user->delete();
            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }
    }

    /**
     * Returns user list
     *
     * Response JSON Object Array:
     *
     * id (integer)
     * role (integer)
     * login (string)
     * created_at (datetime)
     * updated_at (datetime)
     * phone (string)
     * note (string)
     * validated (boolean)
     * enabled (boolean)
     * read_only (boolean)
     * ip (string)
     * user_agent (string)
     * validated_at (datetime)
     *
     * @param $request \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll(Request $request)
    {
        try {
            $users = User::all();
            return response()->json(
                [
                    'status' => 'success',
                    'users' => $users->toArray()
                ], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }
    }


    /**
     * Gets user info
     *
     * Response JSON Object:
     *
     * id (integer)
     * role (integer)
     * login (string)
     * created_at (datetime)
     * updated_at (datetime)
     * phone (string)
     * note (string)
     * validated (boolean)
     * enabled (boolean)
     * read_only (boolean)
     * ip (string)
     * user_agent (string)
     * validated_at (datetime)
     *
     * @param $request \Illuminate\Http\Request
     * @param $login string
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request, $login)
    {
        try {
            $user = User::whereLogin($login)->take(1)->get()[0];
            return response()->json(['status' => 'success', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }
    }

    /**
     * Updates user
     *
     * Request JSON Object:
     *
     * login (string) – User’s login (required)
     * role (integer) – Type of user (required)
     * enabled (boolean) - Is User enabled (required)
     * note (string) – User’s description (required)
     *
     * Response JSON Object:
     * status (string) - If user is updated you'll get 'success', if not updated you'll get 'error'
     * errors (string) - Validation errors
     *
     * @param $request \Illuminate\Http\Request
     * @param $smsSender SmsSenderServiceInterface
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, SmsSenderServiceInterface $smsSender)
    {
        $v = Validator::make($request->json()->all(), [
            'login' => 'required|exists:users',
            'role' => 'required|string',
            'enabled' => 'required|boolean',
            'note' => 'required|string',
            'password' => 'min:8|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 200);
        }
        try {
            $user = User::whereLogin($request->login)->take(1)->get()[0];
            $user->role = $request->role;
            $user->note = $request->note;
            $user->enabled = $request->enabled;

            if (!empty($request->password)) {
                if (($user->validated) and !empty($user->phone)) {
                    $user->password = bcrypt($request->password);
                    $smsSender->sendSMS($user->phone, 'New auth credentials for service ' .
                        config('app.name') . ' has been generated. Login: ' .
                        $request->login . ' Password: ' . $request->password);
                } else {
                    throw new \Exception('Password could not be changed. The user is not validated or their phone is unknown');
                }
            }
            $user->save();
            return response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }


    }


    /**
     * Generates new pass for user
     *
     * Response JSON Object:
     * status (string) - If user is updated you'll get 'success', if not updated you'll get 'error'
     * errors (string) - Validation errors
     *
     * @param $request \Illuminate\Http\Request
     * @param $login string
     * @param $smsSender SmsSenderServiceInterface
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function generateNewPass(Request $request, $login, SmsSenderServiceInterface $smsSender)
    {
        $v = $validator = Validator::make(
            array('login' => $login),
            array('login' => 'required|exists:users')
        );
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = User::whereLogin($login)->take(1)->get()[0];
        try {
            $newPassword = bin2hex(random_bytes(4));
            $user->password = bcrypt($newPassword);
            $smsSender->sendSMS($user->phone, $newPassword);
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'sms has been sent'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'fail', 'message' => $e->getMessage()], 200);
        }
    }
}