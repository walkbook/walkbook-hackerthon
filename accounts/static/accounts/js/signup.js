import { signupFeature } from './signupFeature.js';

(() => {
	const checkUserid = document.getElementById('checkUserid');
	checkUserid.onclick = () => signupFeature.handleCheckUserid();
})();

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = () => signupFeature.handleCheckPw();
	passwordInput[1].onkeyup = () => signupFeature.handleCheckPw();
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	searchLocation.onclick = () => signupFeature.execLocation();
})();
