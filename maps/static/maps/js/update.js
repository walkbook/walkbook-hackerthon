/////////////////////////// Tag ///////////////////////////////////////
const removeTag = (elem) => {
    return elem.remove();
}

const getTagElement = (tagContent) => {
    var newTagElement = document.createElement('input');
    newTagElement.setAttribute('type', 'text');
    newTagElement.setAttribute('name', 'tags');
    newTagElement.setAttribute('class', 'tag-created');
    newTagElement.setAttribute('style', `width: ${(tagContent.length+1)*15}px`);
    newTagElement.setAttribute('onclick', 'removeTag(this)');
    newTagElement.setAttribute('readonly', 'True');
    newTagElement.setAttribute('value', `${tagContent}`);
    return newTagElement; 
}
const tagInputElement = document.getElementById('tag-input');
tagInputElement.onkeydown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        
        if (tagInputElement.value != '') {
            //중복체크
            tagList = document.querySelectorAll('input[name=tags]');
            for(var i = 0; i < tagList.length; i++) {
                if (tagList[i].value == tagInputElement.value){
                    return tagInputElement.value = '';
                }
            }

            //태그생성
            const tagElement = getTagElement(tagInputElement.value);
            document.getElementById('tag-list').appendChild(tagElement);
            tagInputElement.value = '';
        }
    }
}

//태그 생성
createTag = async () => {
    
    for (var i = 0; i < tagList.length; i++) {
        let tagData = new FormData();
        tagData.append("content", tagList[i].value);
        let response = await axios.post(`/maps/tag/`, tagData);
    }
}

tagCreatedList = document.querySelectorAll('.tag-created');
for(var i = 0; i < tagCreatedList.length; i++) {
    var tagCreated = tagCreatedList.item(i);
    tagCreated.style.width = `${(tagCreated.value.length+1)*15}px`;
}