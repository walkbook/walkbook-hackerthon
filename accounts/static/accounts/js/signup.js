import { feature } from './feature.js';

(() => {
	document.onkeypress = (e) =>{
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}
})();

(() => {
	const checkUserid = document.getElementById('checkUserid');
	checkUserid.onclick = () => feature.checkUserId();
})();

(() => {
	const inputUserid = document.getElementById('userid');
	inputUserid.onkeyup = (e) => {
		if (e.key === 'Enter') {
			feature.checkUserId();
		}
		else feature.clearValidateIdMsg();
	}
})();

(() => {
	const passwordInput = document.querySelectorAll('input[type=password]');
	passwordInput[0].onkeyup = () => feature.showValidatePwMsg();
	passwordInput[1].onkeyup = () => feature.showSamePwMsg();
})();

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => feature.handleSignup(e);
})();

(() => {
	const searchLocation = document.getElementById('searchLocation');
	const inputLocation = document.getElementById('location');
	searchLocation.onclick = () => feature.execLocation();
	inputLocation.onclick = () => feature.execLocation();
})();
