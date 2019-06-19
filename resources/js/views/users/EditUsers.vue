<template>
    <div>
        <div class="row" style="margin-bottom: 0;">
            <div class="col s12 offset-m2 m8 offset-l3 l6 offset-xl3 xl6">
                <h5 class="center-align white-text">
                    Edit user's account "{{user.login}}"
                </h5>
            </div>
        </div>
        <div class="row">
            <div class="col s12 offset-m2 m8 offset-l2 l8 offset-xl2 xl8">
                <table class="highlight card bg"
                       :data-login="user.login"
                       :data-id="user.id">
                    <tbody>
                    <tr>
                        <td colspan="2" class="row">
                            <a @click="$router.push('/users')"
                               style="width: 50px;"
                               class="btn grey darken-3 waves-effect
									    waves-light btn-small col s12 m5 l5 xl5 right">
                                <i class="material-icons">keyboard_backspace</i>
                            </a>
                        </td>
                    </tr>
                    <tr :key="user.id">
                        <td>login</td>
                        <td>{{user.login}}</td>
                    </tr>
                    <tr>
                        <td>role</td>
                        <td>

                            <select v-model.lazy="user.role"
                                    style="color: white; display: block; margin: 0 auto; width: 30%; background-color: rgba(36, 37, 40, 0.51)">
                                <option>root</option>
                                <option>admin</option>
                                <option>user</option>
                            </select>


                        </td>
                    </tr>
                    <tr>
                        <td>note</td>
                        <td>
                            <div class="input-field col s12 m12 l12 offset-xl2 xl10">
										<textarea id="textarea1"
                                                  class="materialize-textarea"
                                                  v-model="user.note">
										</textarea>
                                <label for="textarea1"></label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>phone</td>
                        <td>{{user.phone}}</td>
                    </tr>
                    <tr>
                        <td>enabled</td>
                        <td>
                            <label>
                                <input type="checkbox"
                                       v-model="user.enabled"/>
                                <span></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>validated</td>
                        <td>
                            <label>
                                <input type="checkbox"
                                       v-model="user.validated"/>
                                <span></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>validated at</td>
                        <td>{{user.validated_at}}</td>
                    </tr>
                    <tr>
                        <td>ip</td>
                        <td>{{user.ip}}</td>
                    </tr>
                    <tr>
                        <td>user agent</td>
                        <td>{{user.user_agent}}</td>
                    </tr>
                    <tr>
                        <td>created at</td>
                        <td>{{user.created_at}}</td>
                    </tr>
                    <tr>
                        <td>updated at</td>
                        <td>{{user.updated_at}}</td>
                    </tr>


                    <tr>
                        <td>password</td>
                        <td class="tooltipped darken-3 bold">
                            <div class="input-field col s12 m12 l12 offset-xl2 xl8">
                                <input type="password"
                                       id="autocomplete-pass"
                                       @keyup="setPass($event)"
                                       @blur="blur"
                                       v-model.lazy="pass"
                                       :class="((user.pass !== user.confirmPass)
									                        && ($v.confirmPass.$dirty && $v.pass.$dirty))
									                        ?
									                        'error'
									                        : null"
                                       autocomplete="off"
                                       class="autocomplete">
                                <label for="autocomplete-pass"></label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>password confirmation</td>
                        <td class="tooltipped darken-3 bold">
                            <div class="input-field col s12 m12 l12  offset-xl2 xl8">
                                <input type="password"
                                       id="autocomplete-confirm-pass"
                                       @keyup="setConfirmPass($event)"
                                       @blur="blur"
                                       v-model.lazy="confirmPass"
                                       :class="((user.pass !== user.confirmPass)
									                        && ($v.confirmPass.$dirty && $v.pass.$dirty))
								                            ?
								                            'error'
									                        : null"
                                       autocomplete="off"
                                       class="autocomplete">
                                <label for="autocomplete-confirm-pass"></label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="row"
                            colspan="2">
                            <a class="btn red lighten-1 waves-effect waves-light btn-small col s12 m5 l5 xl5"
                               style="margin: 5px 0;"
                               @click="deleteUser()">
                                <i class="material-icons left">delete</i>
                                Delete
                            </a>
                            <div class="col hide-on-small-only m2 l2 xl2"></div>
                            <a @click="save"
                               style="margin: 5px 0;"
                               :class="{disabled: (user.pass !== user.confirmPass)
					                        && ($v.confirmPass.$dirty && $v.pass.$dirty)}"
                               class="btn teal lighten-1 waves-effect
									    waves-light btn-small width-btn col s12 m5 l5 xl5">
                                <i class="material-icons left"
                                >save</i>
                                Save</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import users from "../../plugins/controllers/users";
    import {mapState, mapMutations} from "vuex";
    import swal from "sweetalert2";
    import toastMessages from "../../assets/toastMessages";
    import swalOptions from "../../assets/swalOptions";

    export default {
        name: "EditUsers",
        data() {
            return {
                pass: "",
                confirmPass: "",
                user: {}
            };
        },
        validations: {
            pass: {},
            confirmPass: {}
        },

        mounted() {
            this.getUser();
        },
        computed: {
            ...mapState(["tokenSuccess"]),
            getSwalOptionsForSaveMethod() {
                if (this.user.confirmPass !== null && (this.pass === "")) {
                    return swalOptions.saveUserWithOutNewPassword();
                } else {
                    return swalOptions.saveUserWithNewPassword();
                }
            },
            getUserForSaveMethod() {
                let user = {
                    login: this.user.login,
                    role: this.user.role,
                    note: this.user.note,
                    enabled: this.user.enabled
                };
                if (this.confirmPass !== ""
                    && this.user.confirmPass !== null
                    && this.user.confirmPass !== undefined
                    && this.user.confirmPass !== 0) {
                    user.password = this.pass;
                    user.password_confirmation = this.confirmPass;
                }
                return user;
            }

        },
        methods: {
            ...mapMutations(["setAuth", "setShowMenu"]),
            clear() {
                this.getUser();
                this.$v.confirmPass.$reset();
                this.$v.pass.$reset();
                this.pass = "";
                this.confirmPass = "";
            },
            save() {
                console.log(this.getUserForSaveMethod);
                swal.fire(this.getSwalOptionsForSaveMethod).then((result) => {
                    if (result.value) {
                        users.updateUser(this.getUserForSaveMethod)
                            .then((res) => {
                                if (res.data.status === "success") {
                                    this.$router.push("/users");
                                    this.$toast.success(toastMessages.changesAccepted());
                                } else if (res.data.status === "error") {
                                    this.$toast.error(toastMessages.changesNotAccepted(JSON.stringify(res.data.errors)));
                                    this.clear();
                                }
                            })
                            .catch(e => {
                                this.$toast.error(toastMessages.changesNotAccepted(e.toString()));
                                this.clear();
                            });
                    }
                })
            },
            setPass(event) {
                this.pass = event.target.value;
                this.$v.pass.$touch();
            },
            setConfirmPass(event) {
                if (event.target.value === "") {
                    this.$v.confirmPass.$reset();
                } else {
                    this.$v.confirmPass.$touch();
                }
                this.confirmPass = event.target.value;
            },
            blur() {
                if (this.$v.confirmPass.$dirty && this.$v.pass.$dirty) {
                    this.user.pass = this.pass;
                    this.user.confirmPass = this.confirmPass;
                }
            },
            getUser() {
                users.getUserByLogin(this.$route.params.login)
                    .then(res => {
                        if (res.data.status === "success") {
                            this.user = res.data.user;
                        }
                    })
                    .catch(e => {
                        this.setAuth(true);
                        if (e.message.toLowerCase() === "network error") {
                            this.$toast.error(toastMessages.connectionError());
                        } else {
                            this.$toast.error(toastMessages.authorizationError());
                        }
                    });
            },
            deleteUser() {
                swal.fire(
                    swalOptions.deleteUser()
                ).then(res => {
                    if (res) {
                        users.deleteUser(this.user.login)
                            .then(res => {
                                if (res.data.status === "success") {
                                    this.$toast.success(toastMessages.userHasBeenDeleted());
                                    this.$router.push("/users");
                                } else if (res.data.status === "error") {
                                    this.$toast.error(toastMessages.userHasNotBeenDeleted(JSON.stringify(res.data.errors)));
                                }
                            })
                            .catch(e => {
                                console.log(e);
                                this.$toast.error(toastMessages.userHasNotBeenDeleted());
                            })
                            .then(() => {
                            });
                    }
                }).catch(e => {
                    console.log("error", e);
                });

            },
        }
    };
</script>
<style scoped lang="scss">
    .bold {
        font-weight: 500;
    }

    @media screen and (max-width: 600px) {
        h5 {
            font-size: 16px;
            margin-bottom: 0;
        }
    }

    .bg {
        background-color: rgba(56, 56, 56, 0.8);
    }

    input[type="password"] {
        transition: all 0.3s
    }

    input[type="password"].error {
        color: #c62828;
        border-bottom: 1px solid #c62828;
        box-shadow: 0 1px 0 #c62828;

        &:not(.browser-default):focus:not([readonly]) {
            border-bottom: 1px solid #c62828;
            box-shadow: 0 1px 0 #c62828;
        }

        &:not(.browser-default):focus:not([readonly]) + label {
            color: #c62828;
        }
    }

    textarea, input {

        color: #fff;
        transition: all 0.3s;
    }

    textarea:not(.browser-default):focus:not([readonly]) {
        &:not(.browser-default):focus:not([readonly]) {
            border-bottom: 1px solid #4d5ff1;
            box-shadow: 0 1px 0 #4c5edf;
        }

        &:not(.browser-default):focus:not([readonly]) + label {
            color: #4d5ff1;
        }
    }

    input[type="password"], input[type="text"] {
        &:not(.browser-default):focus:not([readonly]) {
            border-bottom: 1px solid #4d5ff1;
            box-shadow: 0 1px 0 #4c5edf;
        }

        &:not(.browser-default):focus:not([readonly]) + label {
            color: #4d5ff1;
        }
    }

    [type="checkbox"]:checked + span:not(.lever):before {
        border: 2px solid transparent;
        border-right-color: white;
        border-bottom-color: white;
    }

    [type="checkbox"] + span:not(.lever):before {
        border: 2px solid white;
    }

    .parallax-container {
        height: auto;
    }

    table.highlight > tbody > tr > td {
        padding: 7px 10px;
        font-size: 14px;
    }

    table.highlight > tbody > tr > td:first-child {
        padding-left: 12px;
    }

    table.highlight > tbody > tr:hover {
        background-color: rgba(36, 37, 40, 0.51);
    }

    .input-field {
        padding-right: 0;
        margin: 0;
    }

    tr td:first-child {
        width: 20%;
        font-weight: 600;
        text-transform: uppercase;
    }

    tr td:last-child {
        text-align: center;
    }

    .width-btn {
        margin: 10px;
    }
</style>
