import { signupFeature } from "./signupFeature.js";

(() => {
  signupFeature.selectOption("sex", sex);
  signupFeature.selectOption("age", age);
  if (is_social) {
    const passwordInput = document.querySelectorAll("input[type=password]");
    passwordInput[0].setAttribute("disabled", "True");
    passwordInput[1].setAttribute("disabled", "True");
  }
})();

(() => {
  const passwordInput = document.querySelectorAll("input[type=password]");
  passwordInput[0].onkeyup = () => signupFeature.handleValidatePw();
  passwordInput[1].onkeyup = () => signupFeature.handleSamePw();
})();

(() => {
  const searchLocation = document.getElementById("searchLocation");
  searchLocation.onclick = () => signupFeature.execLocation();
})();

(() => {
  const myinfoForm = document.getElementById("myinfo-form");
  myinfoForm.onsubmit = (e) => {
    e.preventDefault();
    if (is_social) {
      e.target.submit();
    } else {
      if (signupFeature.validatePassword(signupFeature.getPasswords())) {
        e.target.submit();
      } else {
        signupFeature.dismissSignup("비밀번호");
      }
    }
  };
})();
