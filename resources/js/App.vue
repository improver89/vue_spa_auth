<template>
    <main class="main" :style="background">
        <div class="navbar-fixed">
            <nav class="nav-extended">
                <div class="nav-wrapper indigo darken-3">
                    <router-link :to="'#'"
                                 class="brand-logo">Logo
                    </router-link>
                    <router-link :to="'#'"
                                 data-target="mobile-demo"
                                 class="sidenav-trigger"
                                 v-if="showMenu">
                        <i class="material-icons">menu</i>
                    </router-link>
                    <transition name="fade-menu">
                        <ul id="nav-mobile"
                            class="right hide-on-med-and-down navigations nav-show"
                            v-show="showMenu">
                            <menu-button v-for="item in menu"
                                         :item="item"
                                         :key="item.name"
                                         :className="'waves-light'"/>
                            <!--<play-list-button :showMenu="showMenu"/>-->
                            <account :className="'waves-light'"/>
                            <logout :logout="logout"
                                    :showMenu="showMenu"/>
                        </ul>
                    </transition>
                </div>
            </nav>
        </div>
        <ul class="sidenav"
            id="mobile-demo"
            v-show="showMenu">
            <menu-button v-for="item in menu"
                         :item="item"
                         :key="item.name"
                         :className="'waves-block sidenav-close'"/>
            <!--<play-list-button :showMenu="showMenu"/>-->
            <account/>
            <logout :logout="logout"
                    :showMenu="showMenu"/>
        </ul>
        <div class="content-for-scroll">
            <vue-scroll>
                <transition name="fade" mode="out-in">
                    <auth v-if="auth"/>
                    <!--Компоненты для верификации номера телефона-->
                    <verificate-form v-else-if="showVerificateForm"/>
                    <verificate-code v-else-if="showVerificateCode"/>
                    <router-view v-else/>
                </transition>
            </vue-scroll>
        </div>
        <div class="preloader-app" :style="background">
            <div class="preloader-wrapper active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import Auth from "./components/auth/Auth";
    import Home from "./views/Home";
    import toastMessages from "./assets/toastMessages";
    import setRules from "./assets/setRules";
    import checkToken from "./plugins/controllers/checkToken";
    import logoutReq from "./plugins/controllers/logout";
    import {mapState, mapMutations} from "vuex";
    import {eventEmitter} from "./app";
    import MenuButton from "./components/app/menuButton";
    import Logout from "./components/app/logout";
    import Account from "./components/app/account";
    // Components for phone verification
    import VerificateForm from "./components/auth/verificateForm";
    import VerificateCode from "./components/auth/verificateCode";

    export default {
        data() {
            return {
                background: ""
            };
        },
        components: {
            Auth,
            MenuButton,
            Home,
            Logout,
            Account,
            // Components for phone verification
            VerificateCode,
            VerificateForm,
        },
        mounted() {
            this.preLoadAnimation();
            this.checkToken();
        },
        computed: {
            ...mapState([
                "auth",
                "menu",
                "showMenu",
                "showVerificateForm",
                "showVerificateCode"
            ]),
            localStorage() {
                return `/playlist/${localStorage.getItem("login")}`;
            }
        },
        methods: {
            ...mapMutations([
                "setAuth",
                "setMenu",
                "setShowMenu",
                "setTokenSuccess",
                "setLoginState"
            ]),
            preLoadAnimation() {
                let preloader = document.querySelector(".preloader-app");

                try {
                    window.showPreload = new CustomEvent("showPreload");
                    window.hiddenPreload = new CustomEvent("hiddenPreload");
                } catch (e) {
                    console.log("rrrrr");
                    window.CustomEvent = function (event) {
                        let evt;
                        let params = {
                            bubbles: false,
                            cancelable: false,
                            detail: undefined
                        };
                        evt = document.createEvent("CustomEvent");
                        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                        return evt;
                    };

                    CustomEvent.prototype = Object.create(window.Event.prototype);

                    window.showPreload = window.CustomEvent("showPreload");
                    window.hiddenPreload = window.CustomEvent("hiddenPreload");
                }
                try {
                    window.addEventListener("showPreload", () => {
                        if (preloader.classList.contains("hidden-preloader")) {
                            preloader.classList.remove("hidden-preloader");
                        }
                    });

                    window.addEventListener("hiddenPreload", () => {
                        preloader.classList.add("hidden-preloader");
                    });

                } catch (e) {
                    console.log(e);
                }

                M.Sidenav.init(document.querySelector(".sidenav"));
            },
            checkToken() {
                checkToken().then(res => {
                    if (res.data && res.data.status === 'success') {
                        console.log('checkToken', res);
                        setRules(res);
                        this.setAuth(false);
                        this.setMenu();
                        this.setShowMenu(true);
                        this.setTokenSuccess(true);
                        this.setLoginState(localStorage.getItem("login"));
                        eventEmitter.$emit("tokenSuccess");
                        setTimeout(() => {
                            document.querySelector("#nav-mobile").classList.remove("nav-show");
                        }, 400);
                    } else if (res.data && res.data.status === 'error' && res.data.message === 'Unauthorized'){
                        this.setAuth(true);
                        this.setShowMenu(false);
                    }
                })
                    .catch(e => {
                        this.setAuth(true);
                        this.setShowMenu(false);
                        if (e.message.toLowerCase() === "network error") {
                            this.$toast.error(toastMessages.connectionError());
                        }
                    });
            },
            logout() {
                logoutReq()
                    .then(res => {
                        console.log("logout", res);

                        if (res.data && res.data.status === 'success') {

                            this.setShowMenu(false);
                            this.setAuth(true);
                            this.setMenu();
                            setTimeout(() => {
                                document.querySelector("#nav-mobile").classList.add("nav-show");
                            }, 400);
                            this.setTokenSuccess(false);

                            localStorage.setItem("token", "");
                            localStorage.setItem("login", "");
                            localStorage.setItem("menuItem", "[]");
                            localStorage.setItem("role", "");
                            this.$toast.success(toastMessages.logout());
                        } else {
                            this.$toast.warn(toastMessages.badData());
                        }
                    })
                    .catch(e => {
                        if (e.message.toLowerCase() === "network error") {
                            this.$toast.error(toastMessages.connectionError());
                        } else {
                            this.setAuth(true);
                            this.setShowMenu(false);
                            this.$toast.error(toastMessages.authorizationError());
                        }
                    })
            }
        }
    };
</script>
<style lang="scss">
    @import "./assets/scss/app";

    li a i {
        margin-right: 7px !important;
    }

    @media (max-width: 1100px) {
        li a {
            text-transform: lowercase;
            padding: 0 7px !important;
        }
    }

    .fade-menu-enter-active {
        transition: all 1s ease;
    }

    .fade-menu-leave-active {
        transition: all 1s ease;
    }

    .fade-menu-enter, .fade-menu-leave-to {
        transform: translateX(50%);
        opacity: 0;
    }

    .fade-enter-active {
        transition: all 0.2s ease;
    }

    .fade-leave-active {
        transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
