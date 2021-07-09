import { signupFeature } from './signupFeature.js';

(() => {
	const passwordInput = document.getElementById('password2');
	passwordInput.onkeyup = (e) => signupFeature.handleCheckPw(e);
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();
