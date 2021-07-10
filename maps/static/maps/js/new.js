const container = document.getElementById('map');
const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 4
};

const map = new kakao.maps.Map(container, options);


/////////////////////////// Control ////////////////////////////

const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/////////////////////////// Set Current Location  ////////////////////////////

const currentLocationMsg = '<div style="width:180px;text-align:center;padding:6px 0;">여기 계시는군요! :D</div>';
let currentLocationMarker;
let currentLocationInfowindow;

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

        const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = currentLocationMsg; // 인포윈도우에 표시될 내용입니다

        displayMarker(locPosition, message);

    });

} else {

    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = '현재 위치를 받아올 수 없습니다 :('

    displayMarker(locPosition, message);
}

function displayMarker(locPosition, message) {

    currentLocationMarker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    currentLocationInfowindow = new kakao.maps.InfoWindow({
        content: message,
        removable: true
    });

    currentLocationInfowindow.open(map, currentLocationMarker);

    map.setCenter(locPosition);
}

const geocoder = new kakao.maps.services.Geocoder();

const addrLocationBtn = document.getElementById('address-location-button');
const currLocationBtn = document.getElementById('current-location-button');

addrLocationBtn.addEventListener('click', () => {
    const address = document.getElementById('address-location');

    geocoder.addressSearch(address.value, function (result, status) {

        if (status === kakao.maps.services.Status.OK) {

            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            currentLocationMarker.setMap(null);
            currentLocationInfowindow.close();

            currentLocationMarker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            currentLocationInfowindow = new kakao.maps.InfoWindow({
                content: currentLocationMsg,
                removable: true
            });
            currentLocationInfowindow.open(map, currentLocationMarker);

            map.setCenter(coords);
        }
    });
});

currLocationBtn.addEventListener('click', () => {
    currentLocationMarker.setMap(null);
    currentLocationInfowindow.close();

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            const lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = currentLocationMsg; // 인포윈도우에 표시될 내용입니다

            displayMarker(locPosition, message);

        });

    } else {

        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),   // TODO : 회원 정보의 주소를 가져오기
            message = '현재 위치를 받아올 수 없습니다 :('

        displayMarker(locPosition, message);
    }
});



/////////////////////////// Drawing  ////////////////////////////

let curLine;

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
        removable: true // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다  
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

// 버튼 클릭 시 호출되는 핸들러 입니다
function selectOverlay(type) {
    // 그리기 중이면 그리기를 취소합니다
    manager.cancel();
    // 클릭한 그리기 요소 타입을 선택합니다
    manager.select(kakao.maps.drawing.OverlayType[type]);
}

manager.addListener('state_changed', function () {
    if (manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"].length != 0) {
        showResult();
    }
});

manager.addListener('remove', function () {
    const totalTime = document.getElementById('total-time');
    const totalDistance = document.getElementById('total-distance');
    totalTime.innerHTML = `소요 시간 : 0분`;
    totalDistance.innerHTML = `거리 : 0 m`;
});

function showResult() {
    const line = manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"][0];
    const distance = Math.round(line.getLength());

    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    let walkkTime = distance / 67 | 0;
    let walkHour = '', walkMin = '';

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 ';
    }
    walkMin = '<span class="number">' + walkkTime % 60 + '</span>분';

    const totalTime = document.getElementById('total-time');
    const totalDistance = document.getElementById('total-distance');
    totalTime.innerHTML = `소요 시간 : ${walkHour} ${walkMin}`;
    totalDistance.innerHTML = `거리 : ${distance} m`;
}

/////////////////////////// save map ////////////////////////////////

const saveWalkroadBtn = document.getElementById('save-walkroad-button');

saveWalkroadBtn.addEventListener('click', async () => {
    var walkroad = manager.getData();
    console.log(JSON.stringify(walkroad));

    let data = new FormData();
    //example
    data.append("userid", 4);
    data.append("username", "김세원");
    data.append("walkroad_name", "김세원의 산책로");
    data.append("walkroad_map", JSON.stringify(walkroad));
    
    await axios.post(`/maps/new/`, data);
});

/////////////////////////// Undo & Redo  ////////////////////////////

// // undo, redo 버튼의 disabled 속성을 설정하기 위해 엘리먼트를 변수에 설정합니다
// const undoBtn = document.getElementById('undo');
// const redoBtn = document.getElementById('redo');

// // Drawing Manager 객체에 state_changed 이벤트를 등록합니다
// // state_changed 이벤트는 그리기 요소의 생성/수정/이동/삭제 동작 
// // 또는 Drawing Manager의 undo, redo 메소드가 실행됐을 때 발생합니다
// manager.addListener('state_changed', function () {

//     // 되돌릴 수 있다면 undo 버튼을 활성화 시킵니다 
//     if (manager.undoable()) {
//         undoBtn.disabled = false;
//         undoBtn.className = "";
//     } else { // 아니면 undo 버튼을 비활성화 시킵니다 
//         undoBtn.disabled = true;
//         undoBtn.className = "disabled";
//     }

//     // 취소할 수 있다면 redo 버튼을 활성화 시킵니다 
//     if (manager.redoable()) {
//         redoBtn.disabled = false;
//         redoBtn.className = "";
//     } else { // 아니면 redo 버튼을 비활성화 시킵니다 
//         redoBtn.disabled = true;
//         redoBtn.className = "disabled";
//     }

// });

// // 버튼 클릭 시 호출되는 핸들러 입니다
// function selectOverlay(type) {
//     // 그리기 중이면 그리기를 취소합니다
//     manager.cancel();

//     // 클릭한 그리기 요소 타입을 선택합니다
//     manager.select(kakao.maps.Drawing.OverlayType[type]);
// }

// // undo 버튼 클릭시 호출되는 함수입니다.
// function undo() {
//     // 그리기 요소를 이전 상태로 되돌립니다
//     manager.undo();
// }

// // redo 버튼 클릭시 호출되는 함수입니다.
// function redo() {
//     // 이전 상태로 되돌린 상태를 취소합니다
//     manager.redo();
// }
