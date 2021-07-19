async function onClickLikeBtn(walkroadId){
    const postLikeButton = document.getElementById(`${walkroadId}-like-button`);
    const response = await axios.get(`/maps/${walkroadId}/like/`);
    if (response.data.walkroadLikeOfUser == 1){
        postLikeButton.innerHTML = "favorite"
    }
    else postLikeButton.innerHTML = "favorite_border"
    postLikeButton.setAttribute('data-badge', response.data.walkroadLikeCount);
}
