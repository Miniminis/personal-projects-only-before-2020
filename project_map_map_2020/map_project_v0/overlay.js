/**
 * OVERLAY CIRCLE
 */

function selectOverlay() {

    if (circles.length > 0) {
        removeCircles();
    }

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

        if (circles.length > 0) {
            removeCircles();
        }

        // 상태를 그리고있는 상태로 변경합니다
        drawingFlag = true;

        // 원이 그려질 중심좌표를 클릭한 위치로 설정합니다 
        centerPosition = mouseEvent.latLng;

        // 그려지고 있는 원의 반경을 표시할 선 객체를 생성합니다
        if (!drawingLine) {
            drawingLine = new kakao.maps.Polyline({
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: '#00a0e9', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
            });
        }

        if (!drawingCircle) {
            drawingCircle = new kakao.maps.Circle({
                strokeWeight: 1, // 선의 두께입니다
                strokeColor: '#00a0e9', // 선의 색깔입니다
                strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일입니다
                fillColor: '#00a0e9', // 채우기 색깔입니다
                fillOpacity: 0.2 // 채우기 불투명도입니다 
            });
        }

        // 그려지고 있는 원의 반경 정보를 표시할 커스텀오버레이를 생성합니다
        if (!drawingOverlay) {
            drawingOverlay = new kakao.maps.CustomOverlay({
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 1
            });
        }

    });

    // 지도에 마우스무브 이벤트를 등록합니다
    // 원을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 원의 위치와 반경정보를 동적으로 보여주도록 합니다
    kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {

        // 마우스무브 이벤트가 발생했을 때 원을 그리고있는 상태이면
        if (drawingFlag) {

            // 마우스 커서의 현재 위치를 얻어옵니다 
            var mousePosition = mouseEvent.latLng;

            // 그려지고 있는 선을 표시할 좌표 배열입니다. 클릭한 중심좌표와 마우스커서의 위치로 설정합니다
            var linePath = [centerPosition, mousePosition];

            // 그려지고 있는 선을 표시할 선 객체에 좌표 배열을 설정합니다
            drawingLine.setPath(linePath);

            // 원의 반지름을 선 객체를 이용해서 얻어옵니다 
            var length = drawingLine.getLength();

            if (length > 0) {

                // 그려지고 있는 원의 중심좌표와 반지름입니다
                var circleOptions = {
                    center: centerPosition,
                    radius: length,
                };

                // 그려지고 있는 원의 옵션을 설정합니다
                drawingCircle.setOptions(circleOptions);

                // 반경 정보를 표시할 커스텀오버레이의 내용입니다
                var radius = Math.round(drawingCircle.getRadius()),
                    content = '<div class="rinfo">반경 <span class="rnumber">' + radius + '</span>m</div>';

                // 반경 정보를 표시할 커스텀 오버레이의 좌표를 마우스커서 위치로 설정합니다
                drawingOverlay.setPosition(mousePosition);

                // 반경 정보를 표시할 커스텀 오버레이의 표시할 내용을 설정합니다
                drawingOverlay.setContent(content);

                // 그려지고 있는 원을 지도에 표시합니다
                drawingCircle.setMap(map);

                // 그려지고 있는 선을 지도에 표시합니다
                drawingLine.setMap(map);

                // 그려지고 있는 원의 반경정보 커스텀 오버레이를 지도에 표시합니다
                drawingOverlay.setMap(map);

            } else {

                drawingCircle.setMap(null);
                drawingLine.setMap(null);
                drawingOverlay.setMap(null);

            }
        }
    });

    // 지도에 마우스 오른쪽 클릭이벤트를 등록합니다
    // 원을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면
    // 마우스 오른쪽 클릭한 위치를 기준으로 원과 원의 반경정보를 표시하는 선과 커스텀 오버레이를 표시하고 그리기를 종료합니다
    kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {

        if (drawingFlag) {

            // 마우스로 오른쪽 클릭한 위치입니다 
            var rClickPosition = mouseEvent.latLng;

            // 원의 반경을 표시할 선 객체를 생성합니다
            var polyline = new kakao.maps.Polyline({
                path: [centerPosition, rClickPosition], // 선을 구성하는 좌표 배열입니다. 원의 중심좌표와 클릭한 위치로 설정합니다
                strokeWeight: 3, // 선의 두께 입니다
                strokeColor: '#00a0e9', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
            });

            // 원 객체를 생성합니다
            circle = new kakao.maps.Circle({
                center: centerPosition, // 원의 중심좌표입니다
                radius: polyline.getLength(), // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
                strokeWeight: 1, // 선의 두께입니다
                strokeColor: '#00a0e9', // 선의 색깔입니다
                strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일입니다
                fillColor: '#00a0e9', // 채우기 색깔입니다
                fillOpacity: 0.2  // 채우기 불투명도입니다 
            });

            // 원을 지도에 표시합니다
            circle.setMap(map);

            // 선을 지도에 표시합니다
            polyline.setMap(map);

            var radius = Math.round(circle.getRadius()), // 원의 반경 정보를 얻어옵니다
                circleData = getDataFromDrawingMap(),
                content = getTimeHTML(radius, circleData.cnt); // 커스텀 오버레이에 표시할 반경 정보입니다
        
                displaySelectedPlaces(circleData.cirDataList);
                displaySelectListPagination(circleData.cirDataList.length)

            // 반경정보를 표시할 커스텀 오버레이를 생성합니다
            var radiusOverlay = new kakao.maps.CustomOverlay({
                content: content, // 표시할 내용입니다
                position: rClickPosition, // 표시할 위치입니다. 클릭한 위치로 설정합니다
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 1
            });

            // 반경 정보 커스텀 오버레이를 지도에 표시합니다
            radiusOverlay.setMap(map);

            // 배열에 담을 객체입니다. 원, 선, 커스텀오버레이 객체를 가지고 있습니다
            var radiusObj = {
                'polyline': polyline,
                'circle': circle,
                'overlay': radiusOverlay
            };

            // 배열에 추가합니다
            // 이 배열을 이용해서 "모두 지우기" 버튼을 클릭했을 때 지도에 그려진 원, 선, 커스텀오버레이들을 지웁니다
            circles.push(radiusObj);

            // 그리기 상태를 그리고 있지 않는 상태로 바꿉니다
            drawingFlag = false;

            // 중심 좌표를 초기화 합니다  
            centerPosition = null;

            // 그려지고 있는 원, 선, 커스텀오버레이를 지도에서 제거합니다
            drawingCircle.setMap(null);
            drawingLine.setMap(null);
            drawingOverlay.setMap(null);
            circleData = null;
        }
    });
}

// 지도에 표시되어 있는 모든 원과 반경정보를 표시하는 선, 커스텀 오버레이를 지도에서 제거합니다
function removeCircles() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].circle.setMap(null);
        circles[i].polyline.setMap(null);
        circles[i].overlay.setMap(null);
    }
    circles = [];
}

// 마우스 우클릭 하여 원 그리기가 종료됐을 때 호출하여 
// 그려진 원의 반경 정보와 반경에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance, cnt) {

    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    var walkkTime = distance / 67 | 0;
    var walkHour = '', walkMin = '';

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour = '<span class="rnumber">' + Math.floor(walkkTime / 60) + '</span>시간 '
    }
    walkMin = '<span class="rnumber">' + walkkTime % 60 + '</span>분'

    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    var bycicleTime = distance / 227 | 0;
    var bycicleHour = '', bycicleMin = '';

    // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
    if (bycicleTime > 60) {
        bycicleHour = '<span class="rnumber">' + Math.floor(bycicleTime / 60) + '</span>시간 '
    }
    bycicleMin = '<span class="rnumber">' + bycicleTime % 60 + '</span>분'

    // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
    var content = '<ul class="rinfo">';
    content += '    <li>';
    content += '        <span class="label">반경</span><span class="rnumber">' + distance + '</span>m';
    content += '    </li>';
    // content += '    <li>';
    // content += '        <span class="label">도보</span>' + walkHour + walkMin;
    // content += '    </li>';
    // content += '    <li>';
    // content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
    // content += '    </li>';
    content += '    <li>';
    content += '        <span class="label">총 개수</span><span class="rnumber">' + cnt + '</span>개';
    content += '    </li>';

    // for(var i = 0; i < circleData.cirDataList.length; i++) {
    //     content += '    <li>';
    //     content += '        <span class="label">id</span><span class="rnumber">' + circleData.cirDataList[i].pId + '</span>';
    //     content += '    </li>';
    //     content += '    <li>';
    //     content += '        <span class="label">place_name</span><span class="rnumber">' + circleData.cirDataList[i].place_name + '</span>';
    //     content += '    </li>';
    //     content += '    <li>';
    //     content += '        <span class="label">phone</span><span class="rnumber">' + circleData.cirDataList[i].phone + '</span>';
    //     content += '    </li>';
    //     content += '    <li>';
    //     content += '        <span class="label">address_name</span><span class="rnumber">' + circleData.cirDataList[i].address_name + '</span>';
    //     content += '    </li>';
    //     content += '    <li>';
    //     content += '        <span class="label">road_address_name</span><span class="rnumber">' + circleData.cirDataList[i].road_address_name + '</span>';
    //     content += '    </li>';
    //     content += '    <li>';
    //     content += '        <span class="label">place_url</span><span class="rnumber">' + circleData.cirDataList[i].place_url + '</span>';
    //     content += '    </li>';
    // }

    content += '</ul>'

    return content;
}

function getDataFromDrawingMap() {

    var cnt = 0
    var cirDataList = []

    if (circle != null) {
        var bounds = circle.getBounds();

        for (var i = 0; i < markers.length; i++) {
            var lat = markers[i].getPosition().getLat()
            var lng = markers[i].getPosition().getLng()

            var result = (bounds.la < lat) && (lat < bounds.ka)
            var result02 = (bounds.ea < lng) && (lng < bounds.ja)

            if (result && result02) {
                cnt = cnt + 1;

                for(var j = 0; j < placeList.length; j++) {
                    var placeLat = placeList[j].y 
                    var placeLng = placeList[j].x

                    console.log(placeLat - lat == 0)
                    console.log(placeLng - lng == 0)

                    if ((placeLat == lat) && (placeLng == lng)) {
                        var cirData = {
                            'pId': placeList[j].id,
                            'place_name' : placeList[j].place_name,
                            'phone' : placeList[j].phone,
                            'address_name' : placeList[j].address_name,
                            'road_address_name' : placeList[j].road_address_name,
                            'place_url' : placeList[j].place_url,
                        }
                        cirDataList.push(cirData)
                    }    
                }
            }
        }
    }

    var cirDataObj = {
        'cnt' : cnt,
        'cirDataList' : cirDataList
    }

    console.log(placeList.length)
    console.log(cirDataList.length)

    return cirDataObj;

    // for (var i = 0; i < len; i++) {
    //     var sPoint = circles[i].sPoint;
    //     var ePoint = circles[i].ePoint;

    //     var cnt = 0
    //     for (var i = 0; i < markers.length; i++) {
    //         var lat = markers[i].getPosition().getLat()
    //         var lng = markers[i].getPosition().getLng()

    //         var result = (sPoint.y < lat) && (lat < ePoint.y)
    //         var result02 = (sPoint.x < lng) && (lng < ePoint.x)

    //         if (result && result02) {
    //             cnt = cnt + 1;
    //         }
    //     }

    //     document.getElementById('totalCnt').innerText = cnt;
    // }
}

function displaySelectedPlaces(cirDataList) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment();

    removeAllChildNods(listEl);

    for (var i = 0; i < cirDataList.length; i++) {
        itemEl = getSelectListItem(i, cirDataList[i]);
        fragment.appendChild(itemEl);
    }

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
}

function getSelectListItem(index, circle) {
    circle.pId
    circle.place_name
    circle.phone
    circle.address_name
    circle.road_address_name
    circle.place_url

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + circle.pId + '"></span>' +
            '<div class="info">' +
            '   <h5>' +     circle.place_name            + '</h5>';

    if (circle.road_address_name) {
        itemStr += '    <span>' +     circle.road_address_name        + '</span>' +
            '   <span class="jibun gray">' +     circle.address_name            + '</span>';
    } else {
        itemStr += '    <span>' +     circle.address_name        + '</span>';
    }

    itemStr += '  <span class="tel">' +     circle.phone    + '</span>';
    itemStr += '  <span class="tel">' + circle.place_url + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}
