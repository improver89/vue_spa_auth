const api = require("./api");

export default {

	getAdmins() {
		return api(
			{
				url:     "/users",
				method:  "get",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			}
		);
	},

	newAdmin(data) {
		return api(
			{
				url:     "/users/add",
				method:  "post",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				},
				data:    data
			}
		);
	},

	getAdminByLogin(login) {
		return api(
			{
				url:     `/admins/get/${login}`,
				method:  "get",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				}
			}
		);
	},

	updateAdmin(data) {
		return api(
			{
				url:     `/admins/update`,
				method:  "put",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				},
				data:    data
			}
		);
	},

	deleteAdmin(login) {
		return api(
			{
				url:     `/admins/delete/${login}`,
				method:  "delete",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				}
			}
		);
	}
};
