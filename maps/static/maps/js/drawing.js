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

manager.addListener('state_changed', function () {
    if (manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"].length != 0) {
        showResult();
    }
});

manager.addListener('remove', function () {
    const totalTimeElement = document.getElementById('total-time');
    const totalDistanceElement = document.getElementById('total-distance');
    totalTimeElement.innerHTML = `소요 시간 : 0분`;
    totalDistanceElement.innerHTML = `거리 : 0 m`;
    totalTime = 0;
    totalDistance = 0;
});

function showResult() {
    const line = manager.getOverlays([kakao.maps.drawing.OverlayType.POLYLINE])["polyline"][0];
    const distance = Math.round(line.getLength());

    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    let walkkTime = distance / 67 | 0;
    let walkHour = '', walkMin = '';

    totalTime = walkkTime;
    totalDistance = distance;

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 ';
    }
    walkMin = '<span class="number">' + walkkTime % 60 + '</span>분';

    const totalTimeElement = document.getElementById('total-time');
    const totalDistanceElement = document.getElementById('total-distance');
    totalTimeElement.innerHTML = `소요 시간 : ${walkHour} ${walkMin}`;
    totalDistanceElement.innerHTML = `거리 : ${distance} m`;

}