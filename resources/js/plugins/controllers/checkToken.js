const api = require("./api");

export default function checkToken() {
	return api(
		{
			url:     "/auth/check_token",
			method:  "get",
			headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
			}
		}
	);
}