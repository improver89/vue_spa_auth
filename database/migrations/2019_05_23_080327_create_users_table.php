<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
            $table->bigInteger('id', true)->unsigned();
            $table->string('login')->unique('users_login_unique');
            $table->string('password');
            $table->string('role')->default('user');
            $table->string('note')->nullable();
            $table->string('phone')->nullable()->unique('users_phone_unique');
            $table->boolean('enabled')->default(1);
            $table->boolean('validated')->default(0);
            $table->dateTime('validated_at')->nullable();
            $table->string('validation_code')->nullable();
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();



//			$table->bigInteger('id', true)->unsigned();
//			$table->string('role')->default('user');
//			$table->string('login')->unique('users_login_unique');
//			$table->string('password');
//			$table->string('remember_token', 100)->nullable();
//			$table->timestamps();
//			$table->string('phone')->nullable()->unique('users_phone_unique');
//			$table->string('note')->nullable();
//			$table->boolean('validated')->default(0);
//			$table->boolean('enabled')->default(1);
//			$table->boolean('read_only')->default(1);
//			$table->string('validation_code')->nullable();
//			$table->string('ip', 45)->nullable();
//			$table->text('user_agent')->nullable();
//			$table->dateTime('validated_at')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
