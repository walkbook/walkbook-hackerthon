import { signupFeature } from './signupFeature.js';

(() => {
    const checkpwForm = document.getElementById('checkpw-form');
    checkpwForm.onsubmit = (e) => signupFeature.handleCheckPw(e);
})();
