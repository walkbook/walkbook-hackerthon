for (let i = 0; i < walkroad_paths.length; i++) {
    const path = JSON.parse(walkroad_paths[i].path);
    drawPolyline(walkroad_paths[i].id, path[kakao.maps.drawing.OverlayType.POLYLINE]);
}

// Drawing Manager에서 가져온 데이터 중 선을 아래 지도에 표시하는 함수입니다
function drawPolyline(id, lines) {
    let len = lines.length, i = 0;

    walkroad = walkroads.find(x => x.id === id)

    for (; i < len; i++) {
        const path = pointsToPath(lines[i].points);
        const style = lines[i].options;
        const polyline = new kakao.maps.Polyline({
            map: map,
            path: path,
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeStyle: style.strokeStyle,
            strokeWeight: style.strokeWeight
        });

        const infowindow = new kakao.maps.InfoWindow({
            content: pathInfoContent(id, walkroad.title, walkroad.description, walkroad.time, walkroad.like, `/maps/${id}`),
            map: null,
            position: new kakao.maps.LatLng(lines[0].points[0].y, lines[0].points[0].x)
        })

        kakao.maps.event.addListener(polyline, 'mouseover', function(mouseEvent) {  
            infowindow.setMap(map);
        });

        kakao.maps.event.addListener(polyline, 'mouseout', function(mouseEvent) {  
            infowindow.setMap(null);        
        });
    }
}

// Drawing Manager에서 가져온 데이터 중 
// 선과 다각형의 꼭지점 정보를 kakao.maps.LatLng객체로 생성하고 배열로 반환하는 함수입니다 
function pointsToPath(points) {
    let len = points.length,
        path = [],
        i = 0;

    for (; i < len; i++) {
        const latlng = new kakao.maps.LatLng(points[i].y, points[i].x);
        path.push(latlng);
    }

    return path;
}
