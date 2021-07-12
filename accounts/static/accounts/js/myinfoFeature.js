export const myinfoFeature = {
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

    
};