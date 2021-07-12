export const signupFeature = {
  async isAvailableID() {
    const userId = document.querySelector('input[name=userid]').value;

    let data = new FormData();
    data.append("userid", userId);

    const response = await axios.post(`/accounts/signup/checkid`, data);

    if (response.data.isAvailable) {
      document.getElementById('validate-id').innerHTML = '사용 가능!'
      return true;
    } else {
      document.getElementById('validate-id').innerHTML = 'ID가 이미 존재합니다.'
      return false;
    }
  },

  clearUseridMsg() {
    document.getElementById('validate-id').innerHTML = ''
  },

  getUserId() {
    return document.querySelector('input[name=userid]').value;
  },

  async validateUserId(username) {
    const isAvailableID = await this.isAvailableID();
    return (username !== '') && isAvailableID;
  },

  handleSamePw() {
    if (
      this.isSamePassword(this.getPasswords())
    ) {
      document.getElementById('same-password').innerHTML = '비밀번호가 일치합니다.'
      document.getElementById('same-password').style.color = 'blue';
    } else {
      document.getElementById('same-password').innerHTML = '비밀번호가 일치하지 않습니다.'
      document.getElementById('same-password').style.color = 'red';
    }
  },

  handleValidatePw() {
    document.getElementById('same-password').innerHTML = ''
    if (
      this.isValidFormatPassword(this.getPasswords())
    ) {
      document.getElementById('validate-password').innerHTML = '';
    } else {
      document.getElementById('validate-password').innerHTML = '비밀번호는 4자리 이상의 대소문자, 숫자여야 합니다.'
      document.getElementById('validate-password').style.color = 'red';
    }
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

  async handleSignup(e) {
    e.preventDefault();
    const isvalidUserid = await this.validateUserId(this.getUserId());
    if (isvalidUserid) {
      if (this.validatePassword(this.getPasswords())) {
        this.submitTarget(e);
      } else {
        this.dismissSignup('비밀번호');
      }
    } else {
      this.dismissSignup('ID');
    }
  },

  submitTarget(e) {
    e.target.submit();
  },

  dismissSignup(content) {
    alert(content + '를 확인하십시오!');
  },

  execLocation() {
    new daum.Postcode({
      oncomplete: function (data) {
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

  selectOption(id, value){
    var select = document.getElementById(id);
    var option;
    for (var i=0; i<select.options.length; i++) {
        option = select.options[i];
        if (option.value == value) {
            option.setAttribute('selected', true);
        } 
    }
  },

  async handleCheckPw(e) {
    e.preventDefault();
    const password = document.querySelector('input[name=password]').value;

    let data = new FormData();
    data.append("password", password);

    const response = await axios.post(`/accounts/checkpw/`, data);

    if (response.data.result) {
      const res = await axios.get("/accounts/myinfo/");
      console.log(res);
      } else {
        alert('비밀번호가 다릅니다.');
      }
  },
};
