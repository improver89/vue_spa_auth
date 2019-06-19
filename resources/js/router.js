import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Users from "./views/users/Users";
import EditUsers from "./views/users/EditUsers";
import AddNewUser from "./views/users/AddNewUser";

import Account from "./views/account/Account";


Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/users",
            name: "users",
            component: Users
        },
        {
            path: "/users/add",
            name: "addNewUser",
            component: AddNewUser
        },
        {
            path: "/users/get/:login",
            name: "editing-users",
            component: EditUsers
        },
        {
            path: "/account",
            name: "Account",
            component: Account
        },
    ]
});
