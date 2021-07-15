// 지도에 가져온 데이터로 도형들을 그립니다
drawMarker(path[kakao.maps.drawing.OverlayType.MARKER], infowindow);
drawPolyline(path[kakao.maps.drawing.OverlayType.POLYLINE]);


// // Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers, infowindows) {

    for (let i = 0; i < markers.length; i++) {
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: markers[i].zIndex
        });

        let infowindow;

        for (let j = 0; j < infowindows.length; j++) {
            if (marker.getPosition().equals(infowindows[j].position)) {
                infowindow = new kakao.maps.InfoWindow({
                    content: infoWindowContent(j, infowindows[j].title, infowindows[j].description),
                    map: null,
                    position: marker.getPosition(),
                });

                mappingData[j] = { marker, infowindow }
                
                break;
            }
        }

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
            strokeColor: style.strokeColor,
            strokeOpacity: style.strokeOpacity,
            strokeStyle: style.strokeStyle,
            strokeWeight: style.strokeWeight
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
