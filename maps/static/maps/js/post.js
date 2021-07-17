async function onClickLikeBtn(walkroadId){
    const walkroadLikes = document.getElementById(`${walkroadId}-like-button`);
    const userLike = document.getElementById(`${walkroadId}-userlike`);
    const response = await axios.get(`/maps/${walkroadId}/like/`);
    if (response.data.walkroadLikeOfUser == 1){
        userLike.innerHTML = "하트"
    }
    else userLike.innerHTML = "빈하트"
    walkroadLikes.innerHTML = `${ response.data.walkroadLikeCount } Likes`
}
