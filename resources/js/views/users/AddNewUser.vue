<template>
    <div class="row">
        <div class="col s12 offset-m2 m8 offset-l3 l6 offset-xl3 xl6">
            <ul class="tabs" id="dark">
                <li class="tab col s3"
                    @click="resetAll($event.target)">
                    <a class="dark">Name</a>
                </li>
                <li :class="{disabled: emptyLogin}"
                    @click="returnToPass($event.target)"
                    class="tab col s3">
                    <a :class="{disabled: emptyLogin}" class="dark">Password</a>
                </li>
                <li :class="{disabled: emptyPass}"
                    @click="returnToConfirmPass($event.target)"
                    class="tab col s3">
                    <a :class="{disabled: emptyPass}" class="dark">Password confirmation</a>
                </li>
                <li :class="{disabled: emptyConfirmPass}"
                    class="tab col s3">
                    <a :class="{disabled: emptyConfirmPass}" class="dark">Settings</a>
                </li>
            </ul>
        </div>
        <transition name="fade" mode="out-in">
            <form-login @hasLogin="hasLogin"
                        v-if="login"
                        id="login"
                        :key="'login'"/>
            <form-pass @hasPass="hasPass"
                       v-else-if="pass"
                       id="pass"
                       :key="'pass'"/>
            <form-confirm-pass @hasConfirmPass="hasConfirmPass"
                               v-else-if="confirm"
                               id="confirm_pass"
                               :key="'confirm_pass'"/>
            <form-settings @createAdmin="createAdmin"
                           v-else-if="settings"
                           id="settings"
                           :key="'settings'"/>
        </transition>
    </div>
</template>
<script>
    import FormLogin from "../../components/admins/FormLogin";
    import FormPass from "../../components/admins/FormPass";
    import FormConfirmPass from "../../components/admins/FormConfirmPass";
    import FormSettings from "../../components/admins/FormSettings";
    import admins from "../../plugins/controllers/admins";

    import {mapMutations} from "vuex";
    import toastMessages from "../../assets/toastMessages";

    export default {
        name: "addNewUser",
        data() {
            return {
                login: true,
                pass: false,
                confirm: false,
                settings: false,
                emptyLogin: true,
                emptyPass: true,
                emptyConfirmPass: true,
                newAdmin: {},
                counterPointer: 0
            };
        },
        components: {
            FormSettings,
            FormConfirmPass,
            FormLogin,
            FormPass
        },
        mounted() {
            M.Tabs.init(document.querySelector(".tabs"));
        },
        methods: {
            ...mapMutations(["setAuth"]),
            createAdmin(data) {
                admins.newAdmin({
                    login: this.newAdmin.login,
                    password: this.newAdmin.pass,
                    password_confirmation: this.newAdmin.pass,
                    role: data.role,
                    enabled: data.enabled,
                    note: data.note
                })
                	.then(res => {
                        if (res.data.status === "success") {
                            this.$router.push("/users");
                            this.$toast.success(toastMessages.userHasBeenCreated());
                        } else if (res.data.status === "error") {
                            this.$toast.error(toastMessages.userHasNotBeenCreated(JSON.stringify(res.data.errors)));

                        }
                	})
                	.catch(e => {
                		console.log(e);
                		this.setAuth(true);
                		this.$toast.error(toastMessages.userHasNotBeenCreated());
                	});
            },
            hasLogin(res) {
                if (res.login.length > 0) {
                    this.login = false;
                    this.pass = true;
                    this.emptyLogin = false;
                    this.newAdmin.login = res.login;
                }
                this.counterPointer = 1;
                this.widthBlock();
            },
            hasPass(res) {
                if (res.pass.length > 0) {
                    this.pass = false;
                    this.confirm = true;
                    this.emptyPass = false;
                    this.newAdmin.pass = res.pass;
                    this.counterPointer = 2;
                    this.widthBlock();
                }

            },
            hasConfirmPass(res) {
                if (res.confirmPass.length > 0) {
                    if (this.newAdmin.pass === res.confirmPass) {
                        this.confirm = false;
                        this.settings = true;
                        this.emptyConfirmPass = false;
                        this.settings = true;
                        this.counterPointer = 3;
                        this.widthBlock();
                    } else {
                        this.$toast.warn(toastMessages.passwordConfirmationFailed());
                    }
                }
            },
            widthBlock() {
                let elements = document.querySelector(".tabs").children;
                let width = elements[this.counterPointer].offsetWidth;
                let left = width * this.counterPointer;
                let right = width * (elements.length - this.counterPointer - 2);

                elements[elements.length - 1].style.left = left + "px";
                elements[elements.length - 1].style.right = right + "px";
            },
            resetAll() {
                this.login = true;
                this.pass = false;
                this.confirm = false;
                this.settings = false;
                this.emptyLogin = true;
                this.emptyPass = true;
                this.emptyConfirmPass = true;
            },
            returnToPass() {
                if (!this.emptyLogin) {
                    this.resetAll();
                    this.login = false;
                    this.pass = true;
                    this.emptyLogin = false;
                }
            },
            returnToConfirmPass() {
                if (!this.emptyPass) {
                    this.resetAll();
                    this.login = false;
                    this.confirm = true;
                    this.emptyLogin = true;
                    this.emptyLogin = false;
                    this.emptyPass = false;
                    this.emptyConfirmPass = true;
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    li {
        cursor: pointer;
    }

    #dark {
        background-color: rgba(122, 122, 122, 0.15);
    }

    #dark li a {
        color: #ffffff;
    }

    #dark li a.disabled {
        color: #787878;
        background-color: rgba(186, 176, 184, 0.31);
    }

    .fade-enter-active {
        transition: all 0.3s ease;
    }

    .fade-leave-active {
        transition: all 0.3s ease;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave-to {
        opacity: 0;
    }
</style>
