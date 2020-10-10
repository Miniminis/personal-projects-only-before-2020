function addMarker(position) {
    // var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
    var imageSrc = './imgs/icon_marker03.png',
        imageSize = new kakao.maps.Size(36, 37),
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
            position: position,
            image: markerImage
        });

    marker.setMap(map);

    return marker;
}

function removeMarker() {
    for (var i = 0; i < placeObjList.length; i++) {
        placeObjList[i].marker.setMap(null);
    }
    placeObjList = [];
}


var initClickHandler = function (mouseEvent) {

    removeCircles();

    if (initRectangle != null) {
        initRectangle.setMap(null);
        initRectangle = null

        for (var i=0; i < placeObjList.length; i++) {
            if (!placeObjList[i].visibility) {
                placeObjList[i].marker.setVisible(true)
                placeObjList[i].visibility = true
            }
        }

        changeListData(placeObjList.length);
    }
};

function showMarkersInRadiusOnly() {

    mapCenter = map.getCenter();
    var initCircle = new kakao.maps.Circle({
        center: mapCenter,
        radius: searchRadius,
        strokeWeight: 1,
        strokeColor: '#00a0e9',
        strokeOpacity: 0.1,
        strokeStyle: 'solid',
        fillColor: '#00a0e9',
        fillOpacity: 0.2
    });

    var bounds = initCircle.getBounds();
    initRectangle = new kakao.maps.Rectangle({
        bounds: bounds,
        strokeWeight: 1,
        strokeColor: '#00a0e9',
        strokeOpacity: 1,
        strokeStyle: 'shortdashdot',
        fillColor: '#00a0e9',
        fillOpacity: 0.2
    });

    var cnt = 0;
    for (var i = 0; i < placeObjList.length; i++) {
        var lat = placeObjList[i].marker.getPosition().getLat()
        var lng = placeObjList[i].marker.getPosition().getLng()

        var result = (bounds.la < lat) && (lat < bounds.ka)
        var result02 = (bounds.ea < lng) && (lng < bounds.ja)

        if (result && result02) {
            cnt = cnt + 1
            placeObjList[i].visibility = true
        } else {
            placeObjList[i].visibility = false
            placeObjList[i].marker.setVisible(false) 
        }
    }

    if(cnt != 0) {
        initRectangle.setMap(map);
        map.setBounds(bounds);    
    }

    kakao.maps.event.addListener(map, 'click', initClickHandler);

    return cnt;
}

