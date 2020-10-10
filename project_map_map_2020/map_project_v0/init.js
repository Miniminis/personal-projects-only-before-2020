/* 
INIT 
*/

var locPosition = new kakao.maps.LatLng(37.566826, 126.9786567) //시청
var map, customOverlay, ps, infowindow, drawingOptions, infoOverlay = null

var drawingFlag = false;
var centerPosition, drawingCircle, drawingLine, drawingOverlay, drawingDot, circle;

var markers = [];
var circles = [];
var placeList = [];

geoLocationInit();

function getLocation(position) {
    var lat = position.coords.latitude,
        lon = position.coords.longitude;

    if (lat != null && lon != null) {
        locPosition = new kakao.maps.LatLng(lat, lon)
    }

    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: locPosition,
            level: 3
        };

    map = new kakao.maps.Map(mapContainer, mapOption);
    customOverlay = new kakao.maps.CustomOverlay({});
    ps = new kakao.maps.services.Places();
    infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true});
}

function geoLocationInit() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, function (error) {
            consol.log(error.message);
        });
    } else {
        consol.log("Geolocation을 지원하지 않는 브라우저 입니다.");
    }    
}

var isEmpty = function (value) {
    if (value == "" ||
        value == null ||
        value == undefined ||
        (value != null && typeof value == "object" && !Object.keys(value).length)
    ) {
        return true
    } else {
        return false
    }
};
