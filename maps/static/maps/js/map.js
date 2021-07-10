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

    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),   // TODO : 회원 정보의 주소를 가져오기
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

const locationBtn = document.getElementById('location-button');

locationBtn.addEventListener('click', () => {
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
