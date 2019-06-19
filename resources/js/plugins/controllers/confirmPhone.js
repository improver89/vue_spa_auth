const api = require("./api");

export default function confirmPhone(code) {
    return api(
        {
            url: "/auth/validate_code",
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            },
            data: {
                login: localStorage.getItem("login"),
                validation_code: code
            }
        }
    );
}

