import { myinfoFeature } from './myinfoFeature.js';
import { signupFeature } from './signupFeature.js';

(() => {
    myinfoFeature.selectOption('sex', sex);
    myinfoFeature.selectOption('age', age);
})();

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = () => signupFeature.handleValidatePw();
	passwordInput[1].onkeyup = () => signupFeature.handleSamePw();
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	searchLocation.onclick = () => signupFeature.execLocation();
})();

(() => {
	const myinfoForm = document.getElementById('myinfo-form');
	myinfoForm.onsubmit = (e) => {
        e.preventDefault();
        if (signupFeature.validatePassword(signupFeature.getPasswords())){
            e.target.submit();
        }
        else {
            signupFeature.dismissSignup('비밀번호');
        }
    }
})();
