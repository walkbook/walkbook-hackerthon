export const signupFeature = {
	handleCheckPw(e){
    validatePasswordMsg = document.getElementById('validate-password');
    if (
      this.isSamePassword(passwords)
    ) {
      validatePasswordMsg.innerHTML='비밀번호가 일치합니다.'
      validatePasswordMsg.style.color='blue';
    } else {
      validatePasswordMsg.innerHTML='비밀번호가 일치하지 않습니다.'
      validatePasswordMsg.style.color='red';
    }

    
  },

	handleSignup(e) {
		e.preventDefault();

		if (
			this.validateUserId(this.getUserId()) &&
			this.validatePassword(this.getPasswords())
		) {
			this.submitTarget(e);
		} else {
			this.dismissSignup();
		}
	},

	getUserId() {
		return document.querySelector('input[name=userid]').value;
	},

	validateUserId(username) {
		return username !== '';
	},

	getPasswords() {
		return [...document.querySelectorAll('input[type=password]')].map(
			(input) => input.value
		);
	},

	isSamePassword([pw1, pw2]) {
		return pw1 === pw2;
	},

	isValidFormatPassword([pw]) {
    //"4글자 이상"의 "알파벳 대소문자 또는 숫자"
		const regExp = /^[A-Za-z0-9]{4,}$/;

		return regExp.test(pw);
	},

	validatePassword(passwords) {
		return (
			this.isSamePassword(passwords) && this.isValidFormatPassword(passwords)
		);
	},

	submitTarget(e) {
		e.target.submit();
	},

	dismissSignup() {
		
	},

};
