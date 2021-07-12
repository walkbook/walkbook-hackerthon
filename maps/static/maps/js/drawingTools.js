const saveWalkroadBtn = document.getElementById('save-walkroad-button');

saveWalkroadBtn.addEventListener('click', async () => {
    const path = manager.getData();
    console.log(JSON.stringify(path));

    const title = document.getElementById('title-input');
    const description = document.getElementById('description-input');
    const start = document.getElementById('start-input');
    const finish = document.getElementById('finish-input');
    const tmi = document.getElementById('tmi-input');

    let data = new FormData();
    data.append("title", title.value);
    data.append("description", description.value);
    data.append("start", start.value);
    data.append("finish", finish.value);
    data.append("tmi", tmi.value);
    data.append("path", JSON.stringify(path));
    data.append("distance", totalDistance);
    data.append("time", totalTime);

    await axios.post(`/maps/new/`, data)
        .then(function (response) {
            window.location.href = `/maps/${response.data.id}`;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
});

/////////////////////////// Undo & Redo  ////////////////////////////

// undo, redo 버튼의 disabled 속성을 설정하기 위해 엘리먼트를 변수에 설정합니다
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

// Drawing Manager 객체에 state_changed 이벤트를 등록합니다
// state_changed 이벤트는 그리기 요소의 생성/수정/이동/삭제 동작 
// 또는 Drawing Manager의 undo, redo 메소드가 실행됐을 때 발생합니다
manager.addListener('state_changed', function () {

    // 되돌릴 수 있다면 undo 버튼을 활성화 시킵니다 
    if (manager.undoable()) {
        undoBtn.disabled = false;
        undoBtn.className = "";
    } else { // 아니면 undo 버튼을 비활성화 시킵니다 
        undoBtn.disabled = true;
        undoBtn.className = "disabled";
    }

    // 취소할 수 있다면 redo 버튼을 활성화 시킵니다 
    if (manager.redoable()) {
        redoBtn.disabled = false;
        redoBtn.className = "";
    } else { // 아니면 redo 버튼을 비활성화 시킵니다 
        redoBtn.disabled = true;
        redoBtn.className = "disabled";
    }

});

// undo 버튼 클릭시 호출되는 함수입니다.
function undo() {
    // 그리기 요소를 이전 상태로 되돌립니다
    manager.undo();
}

// redo 버튼 클릭시 호출되는 함수입니다.
function redo() {
    // 이전 상태로 되돌린 상태를 취소합니다
    manager.redo();
}

// 버튼 클릭 시 호출되는 핸들러 입니다
function selectOverlay(type) {
    // 그리기 중이면 그리기를 취소합니다
    manager.cancel();
    // 클릭한 그리기 요소 타입을 선택합니다
    manager.select(kakao.maps.drawing.OverlayType[type]);
}