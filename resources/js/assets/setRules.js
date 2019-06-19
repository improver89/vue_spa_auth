import setItemMenu from "./setItemMenu";

export default function setRules(res) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("type", res.data.type);
    localStorage.setItem("role", res.data.type);
    localStorage.setItem("login", res.data.login);
    setItemMenu(res.data.type);
}
