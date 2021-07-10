import { signupFeature } from './signupFeature.js';

(() => {
	const checkUserid = document.getElementById('checkUserid');
	checkUserid.onclick = () => signupFeature.isAvailableID();
})();

(() => {
	const inputUserid = document.getElementById('userid');
	inputUserid.onkeyup = () => signupFeature.clearUseridMsg();
})();

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = () => signupFeature.handleValidatePw();
	passwordInput[1].onkeyup = () => signupFeature.handleSamePw();
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	searchLocation.onclick = () => signupFeature.execLocation();
})();
