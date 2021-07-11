const startPoint = data[kakao.maps.drawing.OverlayType.POLYLINE][0]["points"][0];

const container = document.getElementById('map');
const options = {
    center: new kakao.maps.LatLng(startPoint['y'], startPoint['x']),
    level: 5
};

const map = new kakao.maps.Map(container, options);


/////////////////////////// Control ////////////////////////////

const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/////////////////////////// Set Current Location  ////////////////////////////

const geocoder = new kakao.maps.services.Geocoder();

const currentLocationMsg = '<div style="width:180px;text-align:center;padding:6px 0;">여기 계시는군요! :D</div>';
let currentLocationMarker;
let currentLocationInfowindow;
let userAddressX = 126.570667;
let userAddressY = 33.450701;

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

}

const addrLocationBtn = document.getElementById('address-location-button');
const currLocationBtn = document.getElementById('current-location-button');

addrLocationBtn.addEventListener('click', () => {
    const address = document.getElementById('address-location').value;

    geocoder.addressSearch(address, function (result, status) {

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

            map.setCenter(locPosition);
        });

    } else {

        const locPosition = new kakao.maps.LatLng(userAddressY, userAddressX),   // TODO : 회원 정보의 주소를 가져오기
            message = '현재 위치를 받아올 수 없습니다 :('

        displayMarker(locPosition, message);

        map.setCenter(locPosition);
    }
});



/////////////////////////// Show Path Data  ////////////////////////////

// 지도에 가져온 데이터로 도형들을 그립니다
drawMarker(data[kakao.maps.drawing.OverlayType.MARKER]);
drawPolyline(data[kakao.maps.drawing.OverlayType.POLYLINE]);

// Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers) {
    var len = markers.length, i = 0;

    for (; i < len; i++) {
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: markers[i].zIndex
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