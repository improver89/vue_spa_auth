const api = require("./api");

export default function generateNewPass(login) {
	return api({
		url:     `/admins/generateNewPass/${login}`,
		method:  "get",
		headers: {
			"X-TOKEN": localStorage.getItem("token") || "",
			"X-LOGIN": localStorage.getItem("login") || ""
		}
	});
}

