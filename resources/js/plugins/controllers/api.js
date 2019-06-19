const axios = require("axios");


const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	// timeout: 1000,
	headers: { "Content-Type": "application/json" }
});


// Перехватчик запроса на сервер. При запросе запускается прелоадер, блокирующий интерфейс.
api.interceptors.request.use(function (config) {
	console.log("request", config);
	if (window.dispatchEvent) {
		window.dispatchEvent(window.showPreload)
	}
	return config;
}, function () {
	if (window.dispatchEvent) {
		window.dispatchEvent(window.hiddenPreload)
	}
});

// Перехватчик ответа от сервера. После ответа сервера выключает прелоадер.
api.interceptors.response.use(function (response) {
	console.log("response", response);
	if (window.dispatchEvent) {
		window.dispatchEvent(window.hiddenPreload)
	}
	return response;
}, function () {
	if (window.dispatchEvent) {
		window.dispatchEvent(window.hiddenPreload)
	}
});

module.exports = api;