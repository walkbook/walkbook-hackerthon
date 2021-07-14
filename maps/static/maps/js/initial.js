let userAddressX = 126.570667;
let userAddressY = 33.450701;

const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

geocoder.addressSearch(userAddress, function (result, status) {

    if (status === kakao.maps.services.Status.OK) {
        userAddressX = result[0].x;
        userAddressY = result[0].y;
    }
});

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

        const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = geoSuccessMsg; // 인포윈도우에 표시될 내용입니다

        displayMarker(locPosition, message);

        if (setCenterByCurrentLocation) map.setCenter(locPosition);
    });

} else {

    let locPosition = new kakao.maps.LatLng(userAddressY, userAddressX),
        message = geoFailMsg;

    displayMarker(locPosition, message);

    if (setCenterByCurrentLocation) map.setCenter(locPosition);
}

const addrLocationBtn = document.getElementById('address-location-button');
const currLocationBtn = document.getElementById('current-location-button');

addrLocationBtn.addEventListener('click', () => {
    const addressInput = document.getElementById('address-location');

    geocoder.addressSearch(addressInput.value, function (result, status) {

        if (status === kakao.maps.services.Status.OK) {

            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            currentLocationMarker.setMap(null);
            currentLocationInfowindow.close();

            currentLocationMarker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            currentLocationInfowindow = new kakao.maps.InfoWindow({
                content: geoSuccessMsg,
                removable: true
            });
            currentLocationInfowindow.open(map, currentLocationMarker);

            map.setCenter(coords);
        }
    });

    addressInput.value = '';
});

currLocationBtn.addEventListener('click', () => {

    if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
        currentLocationInfowindow.close();
    }

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            const lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = geoSuccessMsg; // 인포윈도우에 표시될 내용입니다

            displayMarker(locPosition, message);

            map.setCenter(locPosition);
        });

    } else {

        const locPosition = new kakao.maps.LatLng(userAddressY, userAddressX),
            message = '현재 위치를 받아올 수 없습니다 :('

        displayMarker(locPosition, message);

        map.setCenter(locPosition);

    }

});

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
}