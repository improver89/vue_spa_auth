const api = require("./api");

export default {
	authYoutube(login) {
		return api({
			url:    `/SoNet/auth/${login}/youtube`,
			method: "get",
			headers: {
				"X-TOKEN": localStorage.getItem("token") || "",
				"X-LOGIN": localStorage.getItem("login") || ""
			}
		});
	},

	checkYoutube(login) {
		return api({
			url:    `/SoNet/check_auth/${login}/youtube`,
			method: "get",
			headers: {
				"X-TOKEN": localStorage.getItem("token") || "",
				"X-LOGIN": localStorage.getItem("login") || ""
			}
		});
	},

	deleteYoutube(login) {
		return api({
			url:    `/SoNet/delete_auth/${login}/youtube`,
			method: "get",
			headers: {
				"X-TOKEN": localStorage.getItem("token") || "",
				"X-LOGIN": localStorage.getItem("login") || ""
			}
		});
	}
};
