<template>
    <div class="card main">
        <nav>
            <div class="nav-wrapper indigo darken-3">
                <a
                        href="#"
                        class="brand-logo center"
                >Authorization</a>
            </div>
        </nav>
        <div class="card-content">
            <form class="row">
                <div
                        class="input-field col s12"
                        v-if="!restorePassword"
                >
                    <input
                            type="text"
                            id="autocomplete-login"
                            @input="setLogin($event)"
                            :style="($v.login.$dirty && !$v.login.required)
							                    ? 'border-bottom: 1px solid #d32f2f; box-shadow: 0 1px 0 #d32f2f'
							                    : null"
                            autocomplete="off"
                            class="autocomplete"
                    >
                    <label
                            for="autocomplete-login"
                            :style="($v.login.$dirty && !$v.login.required)
							                    ? 'color: #d32f2f;'
							                    : null"
                    >
                        Login
                    </label>
                    <error-in-auth :field="$v.login"/>
                </div>
                <div
                        class="input-field col s12"
                        v-if="!restorePassword"
                >
                    <input
                            type="password"
                            id="autocomplete-pass"
                            @input="setPassword($event)"
                            :style="($v.password.$dirty && !$v.password.required)
							                    ? 'border-bottom: 1px solid #d32f2f; box-shadow: 0 1px 0 #d32f2f'
							                    : null"
                            autocomplete="off"
                            class="autocomplete"
                    >
                    <label
                            for="autocomplete-pass"
                            :style="($v.password.$dirty && !$v.password.required)
							                    ? 'color: #d32f2f;'
							                    : null"
                    >
                        Password
                    </label>
                    <error-in-auth :field="$v.password"/>
                </div>
                <div
                        class="input-field col s12"
                        v-if="restorePassword"
                >
                    <input
                            type="text"
                            id="restore-password"
                            autocomplete="off"
                            v-model="numberPhone"
                            class="autocomplete"
                    >
                    <label for="restore-password">
                        Phone number (in format: +79211234567)
                    </label>
                    <error-in-auth :field="$v.login"/>
                </div>
                <button
                        class="waves-effect waves-light btn blue darken-3"
                        v-if="restorePassword"
                        type="button"
                        @click.prevent="forgotPassword"
                >
                    <i class="material-icons">keyboard_arrow_left</i>
                </button>
                <button
                        class="waves-effect waves-light btn right blue darken-3"
                        v-if="restorePassword"
                        @click.prevent="restorePassword"
                >restore password
                </button>
                <button
                        class="waves-effect waves-light btn blue darken-3"
                        v-if="!restorePassword"
                        type="button"
                        @click.prevent="forgotPassword"
                >forgot password?
                </button>
                <button
                        class="waves-effect waves-light btn right indigo darken-3"
                        @click.prevent="submit"
                        v-if="!restorePassword"
                        :class="{disabled: $v.$invalid}"
                >Sing in
                </button>
            </form>
        </div>
    </div>
</template>
<script>
    import Auth from "../../plugins/controllers/auth";
    import restorePassWordFromAPI from "../../plugins/controllers/restorePassword";
    import {eventEmitter} from "../../app";
    import {mapMutations} from "vuex";
    import {required} from "vuelidate/lib/validators";
    import ErrorInAuth from "./errorInAuth";
    import setRules from "../../assets/setRules";
    import preload from "../../assets/preload";
    import toastMessages from "../../assets/toastMessages";

    export default {
        name: "Auth",
        components: {ErrorInAuth},
        data() {
            return {
                login: "",
                password: "",
                restorePassword: false,
                numberPhone: ""
            };
        },
        validations: {
            login: {
                required
            },
            password: {
                required
            }
        },
        methods: {
            ...mapMutations([
                "setMenu",
                "setLoginState",
                "setAuth",
                "setShowMenu",
                "setShowVerificateForm",
                "setTokenSuccess",
                "setRole",
                "setAppendLogin"
            ]),
            setLogin(event) {
                this.login = event.target.value;
                this.$v.login.$touch();
            },
            setPassword(event) {
                this.password = event.target.value;
                this.$v.password.$touch();
            },
            forgotPassword() {
                this.restorePassword = !this.restorePassword;
            },
            async restorePassword() {
                let a = this.numberPhone;
                a = a.trim().replace("+", "");
                let arrNum = Array.from(a);
                if (arrNum[0] === "8") {
                    arrNum.splice(0, 1);
                    arrNum.unshift(7);
                } else if (arrNum[0] === "9") {
                    arrNum.unshift(7);
                }
                try {
                    let res = await restorePasswordFromAPI(arrNum.join(""));
                    if (!res || res.data.code === 500) {
                        this.$toast.error({
                            title: "Возникли проблемы",
                            message: "Попробуйте снова"
                        });
                    } else if (res.data.code === 200) {
                        this.$toast.success({
                            title: "Пароль изменен",
                            message: "Новый пароль придет на ваш номер телефона"
                        });
                        this.forgotPassword();
                    } else if (res.data.code === 404) {
                        this.$toast.error({
                            title: "В нашей базе отсутствует данный номер",
                            message: "Уточните данные и попробуйте снова"
                        });
                    }
                } catch (e) {
                    this.$toast.error({
                        title: "Возникли проблемы",
                        message: "Попробуйте снова"
                    });
                }
            },
            submit() {
                if (!this.$v.$invalid) {
                    Auth(this.login, this.password)
                        .then(res => {
                            console.log(res);
                            if (res.data && res.data.status === 'success') {
                                setRules(res);
                                this.setLoginState(this.login);
                                this.setMenu();
                                this.setAuth(false);
                                this.setShowMenu(true);
                                if (res.data.message === "please add your contacts and validate it") {
                                    this.setShowVerificateForm(true);
                                    this.$toast.warn(toastMessages.validation());
                                } else {
                                    eventEmitter.$emit("tokenSuccess");
                                    this.setTokenSuccess(true);
                                    setTimeout(() => {
                                        document
                                            .querySelector("#nav-mobile")
                                            .classList.remove("nav-show");
                                    }, 400);
                                    this.$router.push("/account");
                                }
                            } else if (res.data && res.data.status === 'fail') {
                                this.$toast.error(toastMessages.userIsDisabled());
                            } else if (res.data && res.data.status === 'error') {
                                this.setAuth(true);
                                this.$toast.error(toastMessages.badAuthCredentials());
                            }
                        })
                        .catch(e => {
                            console.log("Auth", e);
                            if (window.dispatchEvent) {
                                window.dispatchEvent(window.hiddenPreload);
                            }
                            if (e.message.toLowerCase() === "network error") {
                                this.$toast.error(toastMessages.connectionError());
                            }
                        });
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    .brand-logo {
        font-size: 22px;
    }

    form {
        margin: 0;
    }

    input[type="text"],
    input[type="password"] {
        &:not(.browser-default):focus:not([readonly]) {
            border-bottom: 1px solid #4d5ff1;
            box-shadow: 0 1px 0 #4c5edf;
        }

        &:not(.browser-default):focus:not([readonly]) + label {
            color: #4d5ff1;
        }
    }

    .main {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 98%;
        overflow: hidden;
    }

    @media screen and (min-width: 550px) {
        .main {
            width: 400px;
        }
    }

    @media screen and (min-width: 1200px) {
        .main {
            width: 600px;
        }
    }
</style>
