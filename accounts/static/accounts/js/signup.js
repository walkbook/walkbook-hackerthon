import { signupFeature } from './signupFeature.js';

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = (e) => signupFeature.handleCheckPw(e);
	passwordInput[1].onkeyup = (e) => signupFeature.handleCheckPw(e);
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	searchLocation.onclick = (e) => signupFeature.execLocation(e);
})();
