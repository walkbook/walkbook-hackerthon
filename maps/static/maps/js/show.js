// 지도에 가져온 데이터로 도형들을 그립니다
drawMarker(path[kakao.maps.drawing.OverlayType.MARKER], infowindow);
drawPolyline(path[kakao.maps.drawing.OverlayType.POLYLINE]);

kakao.maps.event.addListener(map, 'zoom_changed', function () {
    for (let i = 0; i < infowindow.length; i++) {
        closeOverlay(i);
    }
});

      // Drawing Manager에서 가져온 데이터 중 마커를 아래 지도에 표시하는 함수입니다
function drawMarker(markers, infowindows) {

    for (let i = 0; i < markers.length; i++) {
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(markers[i].y, markers[i].x),
            zIndex: markers[i].zIndex,
            image: new kakao.maps.MarkerImage('/static/maps/img/draw_marker.png', imageSize, imageOption)
        });

        const infowindow = new kakao.maps.InfoWindow({
            content: infoWindowContent(i, infowindows[i].title, infowindows[i].description),
            map: null,
            position: marker.getPosition(),
        });

        mappingData[i] = {
            marker,
            infowindow
        }

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setMap(map);
        });
    }
}

// Drawing Manager에서 가져온 데이터 중 선을 아래 지도에 표시하는 함수입니다
function drawPolyline(lines) {
    var len = lines.length,
        i = 0;

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

function closeOverlay(id) {
    mappingData[id].infowindow.setMap(null);
}

const onSetCommentCount = (commentCount) => {
    const commentCountElement = document.getElementById('comment-count');
    commentCountElement.innerHTML = `<strong>댓글이 ${commentCount}개 있습니다</strong>`;
}

const getCommentElement = (walkroadId, commentId, commentCount, comment, createdTime, author) => {
    var commentElement = document.createElement('p');
    commentElement.id = `walkroad${walkroadId}-comment${commentId}`;
    commentElement.innerHTML = `${author}: ${comment} &nbsp; &nbsp; ${createdTime}
                                <a id="comment${commentId}-like-button" onclick="onLikeComment(${commentId})">
                                ${ commentCount } Likes </a>
                                <a onclick="onDeleteComment(${walkroadId}, ${commentId})">댓글 삭제</a>`
    return commentElement;
}

const onAddComment = async (walkroadId) => {
    const commentInputElement = document.getElementById(`walkroad${walkroadId}-comment-input`);
    const data = new FormData();
    data.append("content", commentInputElement.value);
    const response = await axios.post(`/maps/${walkroadId}/comments/`, data);
    const {
        commentId,
        commentCount,
        commentLikeCount,
        createdTime,
        author
    } = response.data;
    const commentElement = getCommentElement(walkroadId, commentId, commentLikeCount, commentInputElement.value, createdTime, author);
    document.getElementById(`${walkroadId}-comment-list`).appendChild(commentElement);
    onSetCommentCount(commentCount);
    commentInputElement.value = '';
}

const onLikeComment = async (commentId) => {
    const CommentLikeButton = document.getElementById(`comment${commentId}-like-button`);
    const response = await axios.get(`/maps/${commentId}/commentlike/`);
    const commentLikeCount = response.data.commentLikeCount;
    CommentLikeButton.innerHTML = `${commentLikeCount} Likes`;
}

const onDeleteComment = async (walkroadId, commentId) => {
    if (confirm('댓글을 정말 삭제하시겠습니까?')) {
        const response = await axios.delete(`/maps/${walkroadId}/comments/${commentId}/`);
        const commentElement = document.getElementById(`walkroad${walkroadId}-comment${commentId}`);

        const commentCount = response.data.commentCount;
        onSetCommentCount(commentCount);
        commentElement.remove();
    }
}