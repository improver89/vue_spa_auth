const api = require("./api");

export default function restorePassFromAPI(number) {
	return api({
		url: `/auth/recover_password/${number}`,
		method: "get"
	});
}