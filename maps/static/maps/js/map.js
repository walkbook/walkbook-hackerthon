for (let i = 0; i < walkroad_paths.length; i++) {
    const path = JSON.parse(walkroad_paths[i].path);
    drawPolyline(path[kakao.maps.drawing.OverlayType.POLYLINE]);
}

// Drawing Manager에서 가져온 데이터 중 선을 아래 지도에 표시하는 함수입니다
function drawPolyline(lines) {
    var len = lines.length, i = 0;

    for (; i < len; i++) {
        var path = pointsToPath(lines[i].points);
        var style = lines[i].options;
        var polyline = new kakao.maps.Polyline({
            map: map,
            path: path,
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeStyle: style.strokeStyle,
            strokeWeight: style.strokeWeight
        });

        kakao.maps.event.addListener(polyline, 'mouseover', function(mouseEvent) {  
            console.log('mouseover');
        });
    }
}

// Drawing Manager에서 가져온 데이터 중 
// 선과 다각형의 꼭지점 정보를 kakao.maps.LatLng객체로 생성하고 배열로 반환하는 함수입니다 
function pointsToPath(points) {
    var len = points.length,
        path = [],
        i = 0;

    for (; i < len; i++) {
        var latlng = new kakao.maps.LatLng(points[i].y, points[i].x);
        path.push(latlng);
    }

    return path;
}
