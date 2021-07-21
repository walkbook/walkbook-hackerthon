let mappingData = {};
let mappingId = 0;

let polylineExist = false;
let marking = false;

let totalTime = 0;
let totalDistance = 0;

const drawingOptions = { // Drawing Manager를 생성할 때 사용할 옵션입니다
    map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
    drawingMode: [ // Drawing Manager로 제공할 그리기 요소 모드입니다
        kakao.maps.Drawing.OverlayType.MARKER,
        kakao.maps.Drawing.OverlayType.POLYLINE,
    ],
    // 사용자에게 제공할 그리기 가이드 툴팁입니다
    // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
    guideTooltip: ['draw', 'drag', 'edit'],
    markerOptions: { // 마커 옵션입니다 
        draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다 
        removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다  
        markerImages: [
            {
                src: '/static/maps/img/draw_marker.png',
                width: 95,
                height: 69,
                shape: 'rect',
                coords: '0,0,45,50'
            }
        ]
    },
    polylineOptions: { // 선 옵션입니다
        draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
        removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
        editable: true, // 그린 후 수정할 수 있도록 설정합니다 
        strokeColor: '#39f', // 선 색
        hintStrokeStyle: 'dash', // 그리중 마우스를 따라다니는 보조선의 선 스타일
        hintStrokeOpacity: 0.5  // 그리중 마우스를 따라다니는 보조선의 투명도
    }
};

// 위에 작성한 옵션으로 Drawing Manager를 생성합니다
const manager = new kakao.maps.Drawing.DrawingManager(drawingOptions);
const markerBtn = document.getElementById('marker-button');
const polylineBtn = document.getElementById('polyline-button');

manager.addListener('drawstart', function (data) {
    if (data.overlayType == "polyline" && polylineExist) {
        alert('산책로는 한 번에 하나만 추가할 수 있습니다!');
        manager.cancel();
    }
});

manager.addListener('drawend', function (data) {

    if (data.overlayType == "polyline") {
        polylineExist = true;
    } else {
        const markerId = mappingId;
        const marker = data.target;
        const infoWindow = new kakao.maps.InfoWindow({
            content: "",
            map: null,
            position: marker.getPosition()
        })

        mappingData[markerId] = { marker, infoWindow };

        showInfoInput();

        kakao.maps.event.addListener(marker, 'click', function () {
            const infoWindow = mappingData[markerId].infoWindow;
            infoWindow.setPosition(marker.getPosition());
            infoWindow.setMap(map);
        });
    }
});

manager.addListener('state_changed', function () {
    if (manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"].length != 0) {
        showResult();
    }
});

manager.addListener('remove', function (data) {
    if (data.overlayType == 'polyline') {
        const totalTimeElement = document.getElementById('total-time');
        const totalDistanceElement = document.getElementById('total-distance');
        totalTimeElement.innerHTML = `소요 시간 : 0분`;
        totalDistanceElement.innerHTML = `거리 : 0 m`;
        totalTime = 0;
        totalDistance = 0;
        polylineExist = false;
    }
});

function showInfoInput() {
    const infoInputBox = document.getElementById('info-input-container');
    infoInputBox.style.display = 'block';
}

function saveInfo() {
    const titleInput = document.getElementById('info-title-input');
    const descriptionInput = document.getElementById('info-description-input');

    mappingData[mappingId].infoWindow = new kakao.maps.InfoWindow({
        content: infoWindowContent(mappingId, titleInput.value, descriptionInput.value),
        map: map,
        position: mappingData[mappingId].infoWindow.getPosition()
    })

    mappingData[mappingId].title = titleInput.value;
    mappingData[mappingId].description = descriptionInput.value;

    titleInput.value = "";
    descriptionInput.value = "";

    const infoInputBox = document.getElementById('info-input-container');
    infoInputBox.style.display = 'none';

    markerBtn.disabled = false;
    polylineBtn.disabled = false;
    marking = false;

    mappingId++;
}

function selectMarker() {
    manager.cancel();
    manager.select("marker");

    markerBtn.disabled = true;
    polylineBtn.disabled = true;
    marking = true;
}

function selectPolyline() {
    manager.cancel();
    manager.select("polyline");
}

function showResult() {
    const line = manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"][0];
    const distance = Math.round(line.getLength());

    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    let walkkTime = distance / 67 | 0;
    let walkHour = '', walkMin = '';

    totalTime = walkkTime;
    totalDistance = distance;

    walkDistance = `${distance} `;

    if (walkkTime > 60) {
        walkHour = `${Math.floor(walkkTime / 60)}시간 `;
    }
    walkMin = `${walkkTime % 60}분`;

    if (walkDistance >= 1000) {
        walkDistance = `${Math.round(distance / 100) / 10} k`;
    }

    const totalTimeElement = document.getElementById('total-time');
    const totalDistanceElement = document.getElementById('total-distance');
    totalTimeElement.innerHTML = `소요 시간 : ${walkHour} ${walkMin}`;
    totalDistanceElement.innerHTML = `거리 : ${walkDistance}m`;

}


/////////////////////////// InfoWindow  ////////////////////////////

function closeOverlay(id) {
    mappingData[id].infoWindow.setMap(null);
}


/////////////////////////// Undo & Redo  ////////////////////////////

// undo, redo 버튼의 disabled 속성을 설정하기 위해 엘리먼트를 변수에 설정합니다
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

// Drawing Manager 객체에 state_changed 이벤트를 등록합니다
// state_changed 이벤트는 그리기 요소의 생성/수정/이동/삭제 동작 
// 또는 Drawing Manager의 undo, redo 메소드가 실행됐을 때 발생합니다
manager.addListener('state_changed', function () {

    // 되돌릴 수 있다면 undo 버튼을 활성화 시킵니다 
    if (manager.undoable() && !marking) {
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


/////////////////////////// Save Walkroad  ////////////////////////////

const saveWalkroadBtn = document.getElementById('save-walkroad-button');

saveWalkroadBtn.addEventListener('click', async () => {

    if (totalDistance == 0) {
        alert('산책로를 그려주세요!')
        return
    }

    const path = manager.getData();
    const infowindow = [];

    const title = document.getElementById('title-input');
    const description = document.getElementById('description-input');
    const start = document.getElementById('start-input');
    const finish = document.getElementById('finish-input');
    const tmi = document.getElementById('tmi-input');

    for (let i = 0; i < mappingId; i++) {
        if (mappingData[i].marker.getMap()) {
            mappingData[i].marker.setMap(null);
            infowindow.push({
                title: mappingData[i].title,
                description: mappingData[i].description,
                position: mappingData[i].marker.getPosition()
            })
        }
    }

    let data = new FormData();
    data.append("title", title.value);
    data.append("description", description.value);
    data.append("start", start.value);
    data.append("finish", finish.value);
    data.append("tmi", tmi.value);
    data.append("path", JSON.stringify(path));
    data.append("infowindow", JSON.stringify(infowindow));
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