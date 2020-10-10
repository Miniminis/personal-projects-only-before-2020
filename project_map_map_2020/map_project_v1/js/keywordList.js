function displayPlaces(places) {
    bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition);      //마커
        
        bounds.extend(placePosition);

        var placeObj = {
            'place': places[i],
            'marker': marker,
            'visibility': true
        }

        placeObjList.push(placeObj);
    }

    map.setBounds(bounds);
}

function getListItem(place, idx) {

    var el = document.createElement('li'),
        itemStr = '<div class="info">';
    itemStr += '<h5>' + idx + ')'+ place.place_name + '</h5>';

    if (place.road_address_name) {
        itemStr += '    <span>' + place.road_address_name + '</span>' +
            '   <span class="jibun gray">' + place.address_name + '</span>';
    } else {
        itemStr += '    <span>' + place.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + place.phone + '</span>';
    itemStr += '  <span><a href="'+place.place_url+'" class="link" target="_blank">'+place.place_url+'</a></span>';
    itemStr += '  <span>place_id : ' + place.id + '</span>' +

        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function displaySearchPlaces() {

    var listEl = document.getElementById('placesList'), //결과 리스트
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment();

    var idx = 0;
    for (var i = 0; i < placeObjList.length; i++) {

        if (placeObjList[i].visibility) {
            idx += 1;
            var placePosition = new kakao.maps.LatLng(placeObjList[i].place.y, placeObjList[i].place.x),
                itemEl = getListItem(placeObjList[i].place, idx);     //리스트 item        

            (function (marker, title, phone, address_name, road_address_name, place_url) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                kakao.maps.event.addListener(marker, 'click', function () {
                    map.panTo(marker.getPosition());
                    setTimeout(function () {
                        closeOverlay()
                        displayInfowindowDetail(marker, title, phone, address_name, road_address_name, place_url)
                    }, 500);
                });
                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };
    
                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
                itemEl.onclick = function() {
                    map.panTo(marker.getPosition());
                    setTimeout(function () {
                        closeOverlay()
                        displayInfowindowDetail(marker, title, phone, address_name, road_address_name, place_url)
                    }, 500);
                }
            })(placeObjList[i].marker,
                placeObjList[i].place.place_name,
                placeObjList[i].place.phone,
                placeObjList[i].place.address_name,
                placeObjList[i].place.road_address_name,
                placeObjList[i].place.place_url);

            fragment.appendChild(itemEl);
        }
    }
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
}

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function changeListData(cnt) {
    document.getElementById('resultCnt').innerHTML = '<h3> 검색 결과 : ' + cnt + ' 개</h3>';

    var listEl = document.getElementById('placesList');
    removeAllChildNods(listEl);

    displaySearchPlaces();
}

function sendListToServer() {

    sendList = [];
    for (var i=0; i < placeObjList.length; i++) {
        if (placeObjList[i].visibility) {
            sendList.push(placeObjList[i].place)
        }
    }
    
    console.log(sendList)

    $.ajax({
        url: "http://localhost:3000/post",
        type: "POST",
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        data : JSON.stringify(sendList),
        success: function(data) {
            //성공시
        },
        error : function() {
            //실패시
        }
    });
};
