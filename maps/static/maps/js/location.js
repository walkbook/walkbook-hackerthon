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
                content: currentLocationMsg,
                removable: true
            });
            currentLocationInfowindow.open(map, currentLocationMarker);

            map.setCenter(coords);
        }
    });

    addressInput.value = '';
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

        const locPosition = new kakao.maps.LatLng(userAddressY, userAddressX),
            message = '현재 위치를 받아올 수 없습니다 :('

        displayMarker(locPosition, message);
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

    map.setCenter(locPosition);
}