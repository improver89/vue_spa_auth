const api = require("./api");

export default function logout() {
    return api(
        {
            url:     "/auth/logout",
            method:  "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
    );
}
