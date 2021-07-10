export const signupFeature = {

  async handleCheckUserid(){
    const userId = document.querySelector('input[name=userid]').value;
    let data = new FormData();
    data.append("userid", userId);
    const response = await axios.post(`/accounts/signup/checkid`, data);
    console.log(response.data.isDuplicated); 
    
    if (response.data.isDuplicated) {
      document.getElementById('validate-id').innerHTML='ID가 이미 존재합니다.'
    } else {
      document.getElementById('validate-id').innerHTML='사용 가능!'
    }  
  },

  handleCheckPw(){
    if (
      this.isSamePassword(this.getPasswords())
    ) {
      document.getElementById('validate-password').innerHTML='비밀번호가 일치합니다.'
      document.getElementById('validate-password').style.color='blue';
    } else {
      document.getElementById('validate-password').innerHTML='비밀번호가 일치하지 않습니다.'
      document.getElementById('validate-password').style.color='red';
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
		//아직 미구현
	},
  
  execLocation() {
    new daum.Postcode({
      oncomplete: function(data) {
          var addr = '';
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }
          document.getElementById("location").value = addr;
      }
    }).open();
  },
};
