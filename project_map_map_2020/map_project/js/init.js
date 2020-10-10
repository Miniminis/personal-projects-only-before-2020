var locPosition = new kakao.maps.LatLng(37.566826, 126.9786567) //시청
var map, mapCenter, currMarker, mapLevel, customOverlay, ps, infowindow, infoOverlay, searchRadius = null

var drawingFlag = false;
var centerPosition,
    drawingCircle, drawingLine, drawingOverlay, drawingDot,
    circle, initRectangle, drawnRect, radiusObj;

var placeObjList = [];
var circles = [];
var polygons = [];
var sendList = [];

window.onload = geoLocationInit();

function getLocation(position) {
    var lat = position.coords.latitude,
        lon = position.coords.longitude;

    if (lat != null && lon != null) {
        mapCenter = new kakao.maps.LatLng(lat, lon)
    }

    if(map!= null) {
        map.setCenter(mapCenter);
        
        return
    }

    mapLevel = 3
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: mapCenter,
            level: mapLevel
        };

    map = new kakao.maps.Map(mapContainer, mapOption);
    customOverlay = new kakao.maps.CustomOverlay({});
    ps = new kakao.maps.services.Places();
    infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    kakao.maps.event.addListener(map, 'center_changed', function () {
        mapCenter = map.getCenter();
        mapLevel = map.getLevel();
    });

    
    currMarker = new kakao.maps.Marker({
        map: map,
        position : mapCenter
    })

    var slider = document.getElementById("myRange");
    var defaultRedius = document.getElementById("defaultRedius");
    defaultRedius.innerHTML = slider.value; 
    searchRadius = slider.value;
    
    slider.oninput = function () {
        defaultRedius.innerHTML = this.value;
        searchRadius = slider.value;
    }
}

function geoLocationInit() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, function (error) {
            consol.log(error.message);
        });
    } else {
        consol.log("Geolocation을 지원하지 않는 브라우저 입니다.");
    }
};

