const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

        const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = currentLocationMsg; // 인포윈도우에 표시될 내용입니다

        displayMarker(locPosition, message);

    });

} else {

    let locPosition = new kakao.maps.LatLng(userAddressY, userAddressX),
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