import Vue        from "vue";
import Vuelidate  from "vuelidate";
import CxltToastr from "cxlt-vue2-toastr";
import vuescroll  from "vuescroll";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "vue-material-design-icons/styles.css"
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
import "vuescroll/dist/vuescroll.css";

import App        from "./App.vue";
import router     from "./router";
import store      from "./store";


import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

import VueMoment from 'vue-moment';
Vue.use(VueMoment);

Vue.component('apexchart', VueApexCharts);


export const eventEmitter = new Vue();

Vue.use(vuescroll);
Vue.use(Vuelidate);

Vue.use(CxltToastr, {
	position:     "bottom full width",
	showDuration: 1000,
	timeOut:      5000,
	showMethod:   "fadeIn",
	hideMethod:   "fadeOut",
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
