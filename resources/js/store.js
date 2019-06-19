import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: [],
        auth: false,
        showMenu: false,
        showVerificateForm: false,
        showVerificateCode: false,
        tokenSuccess: false,
        login: "",
        role: "",
        showLargePopup: false,
        dataSetIdForLargePopup: null
    },
    mutations: {
        setRole(state, payload) {
            state.role = payload;
        },
        setLoginState(state, payload) {
            state.login = payload;
        },
        setMenu(state) {
            state.menu = JSON.parse(localStorage.getItem("menuItem"));
        },
        setAuth(state, payload) {
            state.auth = payload;
            if (payload) {
                router.push("/");
            }
        },
        setShowMenu(state, payload) {
            state.showMenu = payload;
        },
        setShowVerificateForm(state, payload) {
            state.showVerificateForm = payload;
        },
        setShowVerificateCode(state, payload) {
            state.showVerificateCode = payload;
        },
        setTokenSuccess(state, payload) {
            state.tokenSuccess = payload;
        },
        changeShowLargePopup(state, payload) {
            state.showLargePopup = !state.showLargePopup;

            if (typeof payload === 'object') return;
            state.dataSetIdForLargePopup = payload;
        }
    },
    actions: {}
});
