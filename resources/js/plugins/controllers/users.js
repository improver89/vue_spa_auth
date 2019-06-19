const api = require("./api");

export default {

	getUsers() {
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

	newUser(data) {
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

	getUserByLogin(login) {
		return api(
			{
				url:     `/users/${login}`,
				method:  "get",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				}
			}
		);
	},

	updateUser(data) {
		return api(
			{
				url:     `/users/update`,
				method:  "put",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				},
				data:    data
			}
		);
	},

	deleteUser(login) {
		return api(
			{
				url:     `/users/delete/${login}`,
				method:  "delete",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token") || ""
				}
			}
		);
	}
};
