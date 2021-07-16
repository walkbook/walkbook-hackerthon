import { feature } from './feature.js';

(() => {
	const checkUserid = document.getElementById('checkUserid');
	checkUserid.onclick = () => feature.isAvailableID();
})();

(() => {
	const inputUserid = document.getElementById('userid');
	inputUserid.onkeyup = () => feature.clearUseridMsg();
})();

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = () => feature.handleValidatePw();
	passwordInput[1].onkeyup = () => feature.handleSamePw();
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => feature.handleSignup(e);
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	searchLocation.onclick = () => feature.execLocation();
})();
