// 지도에 가져온 데이터로 도형들을 그립니다
drawMarker(path[kakao.maps.drawing.OverlayType.MARKER], infowindow);
drawPolyline(path[kakao.maps.drawing.OverlayType.POLYLINE]);

kakao.maps.event.addListener(map, 'zoom_changed', function () {
    for (let i = 0; i < infowindow.length; i++) {
        closeOverlay(i);
    }
});

// // Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers, infowindows) {

    for (let i = 0; i < markers.length; i++) {
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: markers[i].zIndex
        });

        const infowindow = new kakao.maps.InfoWindow({
            content: infoWindowContent(i, infowindows[i].title, infowindows[i].description),
            map: null,
            position: marker.getPosition(),
        });

        mappingData[i] = { marker, infowindow }

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setMap(map);
        });
    }
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
            strokeColor: 'rgb(66, 26, 3)',
            strokeOpacity: 0.4,
            strokeStyle: 'solid',
            strokeWeight: 7
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

function closeOverlay(id) {
    mappingData[id].infowindow.setMap(null);
}
