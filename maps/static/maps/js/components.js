const geoSuccessMsg = '<div class="geoSuccessMsg-class" style="width:170px;text-align:center;padding:6px 0;border-none;">현재 위치 근처의 <br>산책로를 찾아보세요!</div>';
const geoFailMsg = '현재 위치를 받아올 수 없습니다 :(';

function infoWindowContent(id, title, description) {
    return `<div class="wrap wrap-i" id=${id}>` +
        '    <div class="info info-i">' +
        '        <div class="title title-i">' +
        `            <div class="title-title-i">📍${title}</div>` +
        `            <div class="close close-i" onclick="closeOverlay(${id})" title="닫기">X</div>` +
        '        </div>' +
        '        <div class="body body-i">' +
        `            <div class="ellipsis ellipsis-i">✔️ ${description}</div>` +
        '        </div>' +
        '    </div>' +
        '</div>';
}

function pathInfoContent(id, title, description, time, like) {
    let walkkTime = time;
    let walkHour = '', walkMin = '';

    if (walkkTime > 60) {
        walkHour = `${Math.floor(walkkTime / 60)}시간 `;
    }
    walkMin = `${walkkTime % 60}분`;
    
    return `<div class="wrap wrap-p" id=${id}>` +
        '    <div class="info info-p">' +
        '        <div class="title title-p">' +
        `            <div class="title-title-p">📍${title}</div>` +
        `            <div class="like-p">${like} Likes</div>` +
        '        </div>' +
        '        <div class="body body-p">'+
        `            <div class="ellipsis ellipsis-p">소요시간 <span>: ${walkHour}${walkMin}</span></div>` +
        `            <div class="ellipsis ellipsis-p">소개 <span>: ${description}</span></div>` +
        '        </div>' +
        '    </div>' +
        '</div>';
}
