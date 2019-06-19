<template>
    <div>
        <div class="row"
             style="margin-bottom: 0;">
            <div class="col s12 offset-m2 m8 offset-l2 l8 offset-xl2 xl8">
                <h5 class="center-align white-text">
                    User list
                </h5>
                <div class="row"
                     style="margin-bottom: 0;">
                    <div class="input-field col s12 m8 l8 xl8">
                        <input id="first_name2"
                               type="text"
                               @keyup="search($event)"
                               class="white-text">
                        <label class="white-text" for="first_name2">Search login</label>
                    </div>
                    <div class="col s12 m4 l4 xl4 main">
                        <router-link :to="'users/add'"
                                     class="waves-effect waves-light btn indigo darken-3 btn-small"
                                     style="width: 100%;">
                            <i class="material-icons left">add</i>
                            New user
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 offset-m2 m8 offset-l2 l8 offset-xl2 xl8">
                <table class="highlight card bg centered">
                    <thead>
                    <tr>
                        <th>login</th>
                        <th>role</th>
                        <th class="hide-on-small-and-down">note</th>
                        <th>validated</th>
                        <th>enable</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr data-id="users"
                        :data-search="user.login"
                        :key="user.id"
                        @click="getUser(user.login)"
                        v-for="user in userList">
                        <td>
                            {{user.login}}
                        </td>
                        <td>
                            {{user.role}}
                        </td>
                        <td class="hide-on-small-and-down" width="200">
                            {{user.note}}
                        </td>
                        <td>
                            <i class="material-icons  darken-3"
                               :class="user.validated ?  'green-text' : 'red-text'">
                                {{user.validated ? "check_circle_outline" : "highlight_off"}}
                            </i>
                        </td>
                        <td>
                            <i class="material-icons  darken-3"
                               :class="user.enabled ?  'green-text' : 'red-text'">
                                {{user.enabled ? "check_circle_outline" : "highlight_off"}}
                            </i>
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
    import toastMessages              from "../../assets/toastMessages";
    import {mapState, mapMutations} from "vuex";
    import Swal from 'sweetalert2'
    import swalOptions from "../../assets/swalOptions";

    export default {
        name: "Users",
        data() {
            return {
                userList: [],
                e: null
            };
        },
        mounted() {
            this.getAllUsers();
        },
        computed: {
            ...mapState(["tokenSuccess"]),

        },
        methods: {
            ...mapMutations([
                "setAuth",
                "setShowMenu"
            ]),
            search(e) {
                let elements = document.querySelectorAll('[data-id="users"]');
                Array.from(elements).forEach(elem => {
                    if (
                        elem.attributes.getNamedItem("data-search").value.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
                    ) {
                        if (elem.classList.contains("hidden")) {
                            elem.classList.remove("hidden");
                        }
                    } else {
                        elem.classList.add("hidden");
                    }
                });
            },
            getUser(login) {
                this.$router.push(`/users/get/${login}`);
                console.log(login);
            },
            getAllUsers() {
                users.getUsers()
                    .then(res => {
                        console.log("getAllAdm", res);
                        if (res.data.status ==='success' ) {
                            this.userList = res.data.users;
                        } else if (res.data.status === 'fail') {
                            this.$toast.warn(toastMessages.error(res.data.message));
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
                    .then(() => {
                        if (!this.e) {
                            let elements = document.querySelectorAll(".tooltips");
                            this.e = M.Tooltip.init(elements, {
                                position: "left"
                            });
                        }
                    });
            },
        }
    };
</script>
<style scoped>
    .bold {
        font-weight: 500;
    }

    .main {
        margin-top: 15px;
    }

    @media screen and (max-width: 600px) {
        .main {
            margin: 0;
        }

        h5 {
            font-size: 16px;
            margin-bottom: 0;
        }
    }

    input[type=text]:not(.browser-default) {
        border-bottom: 1px solid #d0d0d0;
        box-shadow: 0 1px 0 #d0d0d0;
    }

    input[type="text"]:not(.browser-default):focus:not([readonly]) {
        border-bottom: 1px solid #f0e8f1;
        box-shadow: 0 1px 0 #dfd8df;
    }

    label.white-text {
        color: #d0d0d0 !important;

    &
    .active {
        color: #fff !important;
    }

    }

    .hidden {
        display: none;
    }

    input[type="text"] {

    &
    :not(.browser-default):focus:not([readonly]) + label {
        color: #fff;
    }

    }

    .bg {
        background-color: rgba(56, 56, 56, 0.8);
    }

    [type="checkbox"]:checked + span:not(.lever):before {
        border: 2px solid transparent;
        border-right-color: white;
        border-bottom-color: white;
    }

    [type="checkbox"] + span:not(.lever):before {
        border: 2px solid white;
    }

    table.highlight > tbody > tr > td {
        padding: 7px 10px;
        font-size: 14px;
    }

    table.highlight > tbody > tr:hover {
        background-color: rgba(36, 37, 40, 0.51);
    }

    tr {
        cursor: pointer;
    }

    tr th {
        cursor: default;
    }

    tr td:first-child {
        font-weight: 600;
        text-transform: uppercase;
    }

    tr td:last-child {
        text-align: center;
    }

</style>