import { feature } from "./feature.js";

(() => {
    feature.selectOption("sex", sex);
    feature.selectOption("age", age);
    if (is_social) {
        const passwordInput = document.querySelectorAll("input[type=password]");
        passwordInput[0].setAttribute("disabled", "True");
        passwordInput[1].setAttribute("disabled", "True");
    }
})();

(() => {
    const passwordInput = document.querySelectorAll("input[type=password]");
    passwordInput[0].onkeyup = () => feature.showValidatePwMsg();
    passwordInput[1].onkeyup = () => feature.showSamePwMsg();
})();

(() => {
    const searchLocation = document.getElementById("searchLocation");
    searchLocation.onclick = () => feature.execLocation();
    const inputLocation = document.getElementById("location");
    inputLocation.onclick = () => feature.execLocation();
})();

(() => {
const myinfoForm = document.getElementById("myinfo-form");
myinfoForm.onsubmit = (e) => {
    e.preventDefault();
    if (is_social) {
        feature.submitTarget(e);
    } 
    else {
        if (feature.checkPasswords(feature.getPasswords())) {
            feature.submitTarget(e);
        } else {
            feature.dismissSignup("비밀번호");
        }
    }
};
})();
