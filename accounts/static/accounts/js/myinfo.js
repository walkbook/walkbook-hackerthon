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
  passwordInput[0].onkeyup = () => feature.handleValidatePw();
  passwordInput[1].onkeyup = () => feature.handleSamePw();
})();

(() => {
  const searchLocation = document.getElementById("searchLocation");
  searchLocation.onclick = () => feature.execLocation();
})();

(() => {
  const myinfoForm = document.getElementById("myinfo-form");
  myinfoForm.onsubmit = (e) => {
    e.preventDefault();
    if (is_social) {
      e.target.submit();
    } else {
      if (feature.validatePassword(feature.getPasswords())) {
        e.target.submit();
      } else {
        feature.dismissSignup("비밀번호");
      }
    }
  };
})();
