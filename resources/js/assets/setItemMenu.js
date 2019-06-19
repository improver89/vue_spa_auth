export default function setItemMenu(payload) {
	if (payload) {
		let str = [...payload];
		console.log(payload);
		str[0]  = str[0].toUpperCase();
		str     = str.join("");
		if (payload === "root" || payload === "admin" || payload ===  "user" ) {
			localStorage.setItem("menuItem", JSON.stringify(require(`../assets/menuItems${str}`)));
			console.log(str);
		} else if (payload === "logout") {
			localStorage.setItem("menuItem", "");
		}
	} else if (payload === undefined) {
	} else {
		console.log("ошибка /store.js setMenu");
	}
};
