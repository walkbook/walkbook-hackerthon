import { signupFeature } from './signupFeature.js';

(() => {
	const passwordInput = document.querySelector('input[type=password]');
	passwordInput.onchange = (e) => signupFeature.handleCheckPw(e);
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();
