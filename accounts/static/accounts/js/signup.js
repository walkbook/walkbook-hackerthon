import { feature } from './feature.js';

(() => {
	document.onkeypress =(e) =>{
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}
})();

(() => {
	const checkUserid = document.getElementById('checkUserid');
	checkUserid.onclick = () => feature.isAvailableID();
})();

(() => {
	const inputUserid = document.getElementById('userid');
	inputUserid.onkeyup = (e) => {
		if (e.key === 'Enter') {
			feature.isAvailableID(e.target.value);
		}
		else feature.clearUseridMsg(e.target.value);
	}
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
	const inputLocation = document.getElementById('location');
	searchLocation.onclick = () => feature.execLocation();
	inputLocation.onclick = () => feature.execLocation();
})();
