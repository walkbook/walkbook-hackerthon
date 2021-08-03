export const feature = {
    getUserId() {
        return document.querySelector("input[name=userid]").value;
    },
    
    setMsgStyle(document, isAvailable){
        if(isAvailable){
            document.style.color = "green";
            document.style.fontSize = "12px";
            document.style.fontWeight = "lighter"; 
        } else{
            document.style.color = "var(--yellow)";
            document.style.fontSize = "12px";
            document.style.fontWeight = "lighter";
        }
    },

    showValidateIdMsg(isAvailable) {
        let validateIdMsg = document.getElementById("validate-id");
        if (isAvailable) {
            validateIdMsg.innerHTML = "사용 가능!";
        } else {
            validateIdMsg.innerHTML ="ID가 이미 존재합니다.";
        }
        this.setMsgStyle(validateIdMsg, isAvailable);
    },
    
    clearValidateIdMsg() {
        document.getElementById("validate-id").innerHTML = "";
    },
    
    async isAvailableId(userId) {
        let data = new FormData();
        data.append("userid", userId);
        const response = await axios.post(`/accounts/signup/checkid/`, data);
        return response.data.isAvailable
    },

    async checkUserId() {
        const userId = this.getUserId()
        const isAvailable = await this.isAvailableId(userId);
        this.showValidateIdMsg(isAvailable);
        return userId !== "" && isAvailable;
    },

    getPasswords() {
        return [...document.querySelectorAll("input[type=password]")].map(
        (input) => input.value
        );
    },
    
    isSamePassword([pw1, pw2]) {
        return pw1 === pw2;
    },

    isValidFormat([pw]) {
        //"4글자 이상"의 "알파벳 대소문자 또는 숫자"
        const regExp = /^[A-Za-z0-9]{4,}$/;
        return regExp.test(pw);
    },

    checkPasswords(passwords) {
        return (
            this.isSamePassword(passwords) && this.isValidFormat(passwords)
        );
    },

    showValidatePwMsg() {
        document.getElementById("same-password").innerHTML = "";
        const isAvailable = this.isValidFormat(this.getPasswords());
        const validatePwMsg = document.getElementById("validate-password");
        if (isAvailable) {
            validatePwMsg.innerHTML = "";
        } else {
            validatePwMsg.innerHTML = "비밀번호는 4자리 이상의 대소문자, 숫자여야 합니다.";
            this.setMsgStyle(validatePwMsg, isAvailable);
        }
    },

    showSamePwMsg() {
        const isAvailable = this.isSamePassword(this.getPasswords());
        const samePwMsg = document.getElementById("same-password");
        if (isAvailable) {
            samePwMsg.innerHTML = "비밀번호가 일치합니다.";
        } else {
            samePwMsg.innerHTML = "비밀번호가 일치하지 않습니다.";
        }
        this.setMsgStyle(samePwMsg, isAvailable);
    },

    async handleSignup(e) {
        e.preventDefault();
        const isAvailableId = await this.checkUserId();
        const isAvailablePw = this.checkPasswords(this.getPasswords());
        if (isAvailableId && isAvailablePw) {
            this.submitTarget(e);
        } 
        else if (isAvailableId && !isAvailablePw){
            this.dismissSignup("비밀번호");
        } 
        else if (!isAvailableId && isAvailablePw){
            this.dismissSignup("ID");
        }
        else this.dismissSignup("ID와 비밀번호");
    },

    async handleCheckPw(e) {
        e.preventDefault();
        const password = document.querySelector("input[name=password]").value;
        let data = new FormData();
        data.append("password", password);
        const response = await axios.post(`/accounts/checkpw/`, data);
        if (response.data.result) {
            window.location.href = `/accounts/myinfo`;
        } else {
            alert("비밀번호가 다릅니다.");
        }
    },
    
    submitTarget(e) {
        e.target.submit();
    },

    dismissSignup(content) {
        alert(content + "를 확인하십시오!");
    },

    execLocation() {
        new daum.Postcode({
        oncomplete: function (data) {
            var addr = "";
            if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
            } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
            }
            document.getElementById("location").value = addr;
        },
        }).open();
    },

    selectOption(id, value) {
        var select = document.getElementById(id);
        var option;
        for (var i = 0; i < select.options.length; i++) {
            option = select.options[i];
            if (option.value == value) {
                option.setAttribute("selected", true);
            }
        }
    },
};
