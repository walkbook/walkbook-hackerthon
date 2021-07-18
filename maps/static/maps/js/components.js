const geoSuccessMsg = '<div class="geoSuccessMsg-class">여기 계시는군요! :D</div>';
const geoFailMsg = '현재 위치를 받아올 수 없습니다 :(';

function infoWindowContent(id, title, description) {
    return `<div class="wrap" id=${id}>` + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        `            ${id} ${title}` + 
        `            <div class="close" onclick="closeOverlay(${id})" title="닫기">X</div>` + 
        '        </div>' + 
        '        <div class="body">' + 
        `            <div class="ellipsis">${description}</div>` + 
        '            <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
}
