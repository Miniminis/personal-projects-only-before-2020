var overlayClickHandler = function (mouseEvent) {

    drawingFlag = true;
    centerPosition = mouseEvent.latLng;

    if (!drawingLine) {
        drawingLine = new kakao.maps.Polyline({
            strokeWeight: 3,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'solid'
        });
    }

    if (!drawingCircle) {
        drawingCircle = new kakao.maps.Circle({
            strokeWeight: 1,
            strokeColor: '#00a0e9',
            strokeOpacity: 0.1,
            strokeStyle: 'solid',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });
    }

    if (!drawingOverlay) {
        drawingOverlay = new kakao.maps.CustomOverlay({
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 1
        });
    }
};

var overlayMoveHandler = function (mouseEvent) {

    if (drawingFlag) {
        var mousePosition = mouseEvent.latLng;
        var linePath = [centerPosition, mousePosition];
        drawingLine.setPath(linePath);

        var length = drawingLine.getLength();
        if (length > 0) {

            var circleOptions = {
                center: centerPosition,
                radius: length,
            };

            drawingCircle.setOptions(circleOptions);

            var radius = Math.round(drawingCircle.getRadius()),
                content = '<div class="rinfo">반경 <span class="rnumber">' + radius + '</span>m</div>';

            drawingOverlay.setPosition(mousePosition);
            drawingOverlay.setContent(content);
            drawingCircle.setMap(map);
            drawingLine.setMap(map);

            drawingOverlay.setMap(map);

        } else {
            drawingCircle.setMap(null);
            drawingLine.setMap(null);
            drawingOverlay.setMap(null);
        }
    }
};

var overlayRightClickHandler = function (mouseEvent) {

    var rClickPosition = mouseEvent.latLng;

    if (drawingFlag) {
        var polyline = new kakao.maps.Polyline({
            path: [centerPosition, rClickPosition],
            strokeWeight: 3,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'solid'
        });

        circle = new kakao.maps.Circle({
            center: centerPosition,
            radius: polyline.getLength(),
            strokeWeight: 1,
            strokeColor: '#00a0e9',
            strokeOpacity: 0.1,
            strokeStyle: 'solid',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });

        initRectangle = new kakao.maps.Rectangle({
            bounds: circle.getBounds(),
            strokeWeight: 1,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'shortdashdot',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });

        // circle.setMap(map);
        initRectangle.setMap(map);
        polyline.setMap(map);

        var radius = Math.round(circle.getRadius()),
            content = getTimeHTML(radius);

        var radiusOverlay = new kakao.maps.CustomOverlay({
            content: content,
            position: rClickPosition,
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 1
        });

        radiusOverlay.setMap(map);

        radiusObj = {
            'polyline': polyline,
            'circle': circle,
            'overlay': radiusOverlay
        };
    
        circles.push(radiusObj);

        var cnt = showSelectedPlacesOnly();
        changeListData(cnt);

        drawingFlag = false;
        centerPosition = null;

        drawingCircle.setMap(null);
        drawingLine.setMap(null);
        drawingOverlay.setMap(null);
    
        kakao.maps.event.removeListener(map, 'click', overlayClickHandler);
        kakao.maps.event.removeListener(map, 'mousemove', overlayClickHandler);
        kakao.maps.event.removeListener(map, 'rightclick', overlayClickHandler);

        kakao.maps.event.addListener(map, 'click', initClickHandler);

    }
};


function selectOverlay() {

    removeCircles();
    removeRectangle();
    deletePolygon(polygons);

    kakao.maps.event.addListener(map, 'click', overlayClickHandler);
    kakao.maps.event.addListener(map, 'mousemove', overlayMoveHandler);
    kakao.maps.event.addListener(map, 'rightclick', overlayRightClickHandler);

}

function removeCircles() {
    if (circles.length > 0) {
        for (var i = 0; i < circles.length; i++) {
            circles[i].circle.setMap(null);
            circles[i].polyline.setMap(null);
            circles[i].overlay.setMap(null);
        }
    }
    circles = [];
}

function removeRectangle() {
    if (initRectangle != null) {
        initRectangle.setMap(null);
        initRectangle = null
    }
}

function removeExceptMarkers() {
    deletePolygon(polygons);
    initClickHandler();
}

function getTimeHTML(distance) {

    var walkkTime = distance / 67 | 0;
    var walkHour = '', walkMin = '';

    if (walkkTime > 60) {
        walkHour = '<span class="rnumber">' + Math.floor(walkkTime / 60) + '</span>시간 '
    }
    walkMin = '<span class="rnumber">' + walkkTime % 60 + '</span>분'

    var bycicleTime = distance / 227 | 0;
    var bycicleHour = '', bycicleMin = '';

    if (bycicleTime > 60) {
        bycicleHour = '<span class="rnumber">' + Math.floor(bycicleTime / 60) + '</span>시간 '
    }
    bycicleMin = '<span class="rnumber">' + bycicleTime % 60 + '</span>분'

    var content = '<ul class="rinfo">';
    content += '    <li>';
    content += '        <span class="label">반경</span><span class="rnumber">' + distance + '</span>m';
    content += '    </li>';
    content += '    <li>';
    content += '        <span class="label">도보</span>' + walkHour + walkMin;
    content += '    </li>';
    content += '    <li>';
    content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
    content += '    </li>';
    content += '</ul>'

    return content;
}

function showSelectedPlacesOnly() {

    var cnt = 0

    if (circle != null) {
        var bounds = circle.getBounds();

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
    }

    kakao.maps.event.addListener(map, 'click', initClickHandler);

    return cnt;
}

