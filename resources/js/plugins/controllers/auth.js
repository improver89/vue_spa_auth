const api = require("./api");

export default function Auth(login, password) {
	return api({
		url:    "/auth/login",
		method: "post",
		data:   {
			login: login,
			password:  password
		}
	});
}

