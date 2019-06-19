const api = require("./api");

export default {
    getCamerasListByLogin(login) {
        return api(
            {
                url: "/api_v2/get_cameras_list_by_login/"+login,
                method: "get",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    },
    getCameraByName(name){
        return api(
            {
                url: "/api_v2/get_camera_by_name/"+name,
                method: "get",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    },
    createCamera(camera) {
        return api(
            {
                url: "/api_v2/camera",
                method: "post",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                },
                data: camera
            }
        );
    },
    deleteCamera(name){
        return api(
            {
                url: "/api_v2/camera/"+name,
                method: "delete",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                },
            }
        );
    },
    deleteCameraAgent(name){
        return api(
            {
                url: "/api_v2/delete_camera_agent/"+name,
                method: "delete",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                },
            }
        );
    },
    updateCamera(camera) {
        return api(
            {
                url: "/api_v2/camera",
                method: "put",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                },
                data: camera
            }
        );
    },
    getNotProvisionedCameras(){
        return api(
            {
                url: "/api_v2/get_not_provisioned_cameras",
                method: "get",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    },
    getDisabledCameras(){
        return api(
            {
                url: "/api_v2/get_disabled_cameras",
                method: "get",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    },
    disableCameraWithAgent(name){
        return api(
            {
                url: "/api_v2/disable_camera_with_agent/"+name,
                method: "delete",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    },
    enableCameraWithAgent(name){
        return api(
            {
                url: "/api_v2/enable_camera_with_agent/"+name,
                method: "post",
                headers: {
                    "X-TOKEN": localStorage.getItem("token") || "",
                    "X-LOGIN": localStorage.getItem("login") || ""
                }
            }
        );
    }
}