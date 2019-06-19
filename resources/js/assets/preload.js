const preload = function () {
	return {
		show() {
			// console.log(window.showPreload);
			if (window.dispatchEvent) {
				window.dispatchEvent(window.showPreload);
			}
		},
		hidden() {
			// console.log(window.hiddenPreload);
			if (window.dispatchEvent) {
				window.dispatchEvent(window.hiddenPreload);
			}
		}
	}

}();

export default preload
