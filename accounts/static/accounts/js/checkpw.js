import { feature } from './feature.js';

(() => {
    const checkpwForm = document.getElementById('checkpw-form');
    checkpwForm.onsubmit = (e) => feature.handleCheckPw(e);
})();
