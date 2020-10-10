function searchPlaces() {

    removeCircles();
    removeRectangle();
    removeMarker();
    deletePolygon(polygons);

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        displayPlaces(data);

        if (pagination.current != pagination.last) {
            pagination.gotoPage(pagination.current + 1);
        } else {
            var cnt = showMarkersInRadiusOnly(true);
            changeListData(cnt);
        }

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}