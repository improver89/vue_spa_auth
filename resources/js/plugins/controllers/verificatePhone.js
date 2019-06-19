const api = require("./api");

export default function verificatePhone(phone) {
	return api(
		{
			url:     "/auth/add_contacts",
			method:  "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            },
			data:    {
				phone: phone
			}
		}
	);
}
