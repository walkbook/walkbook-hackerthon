let selected = 'register';

function onClickRegisteredPosts() {
    const registeredPosts = GetAllRegisteredPosts();
    const likedPosts = GetAllLikedPosts();
    ShowPosts(registeredPosts);
    ShowPostsBox("registered-posts-box");
    HidePosts(likedPosts);
    HidePostsBox("liked-posts-box");
    selected = 'register';
    walkroads = my_walkroads;
    walkroad_paths = my_walkroad_paths;
    removeOverlays();
    draw()
}

function onClickLikedPosts() {
    const registeredPosts = GetAllRegisteredPosts();
    const likedPosts = GetAllLikedPosts();
    ShowPosts(likedPosts);
    ShowPostsBox("liked-posts-box");
    HidePosts(registeredPosts);
    HidePostsBox("registered-posts-box");
    selected = 'like';
    walkroads = like_walkroads;
    walkroad_paths = like_walkroad_paths;
    removeOverlays();
    draw()
}

function setFocusClickedPost(path){
    const points = path[kakao.maps.drawing.OverlayType.POLYLINE][0]["points"];
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    const clickedPost = new kakao.maps.LatLng((startPoint['y'] + endPoint['y']) / 2, (startPoint['x'] + endPoint['x']) / 2);
    map.setCenter(clickedPost);
}

function GetAllRegisteredPosts() {
    const RegisteredPosts = Array.from(document.querySelectorAll('.registered-post'));
    return RegisteredPosts.map((post) => ({
        post,
        postTitle: post.textContent.trim(),
    }));
}

function GetAllLikedPosts() {
    const LikedPosts = Array.from(document.querySelectorAll('.liked-post'));
    return LikedPosts.map((post) => ({
        post,
        postTitle: post.textContent.trim(),
    }));
}

function ShowPostsBox(box){
    const postsBox = document.getElementById(box);
    postsBox.style.border='1px solid gainsboro';
    postsBox.style.display = 'flex';
}

function ShowPosts(posts) {
    return posts.forEach(({post}) => post.classList.remove('hide'));
}

function HidePostsBox(box){
    const postsBox = document.getElementById(box);
    postsBox.style.border= 0;
    postsBox.style.display = 'None';
}

function HidePosts(posts) {
    return posts.forEach(({post}) => post.classList.add('hide'));
}

function getMatchedPosts(posts, keyword){
    return posts.filter(({postTitle}) => postTitle.includes(keyword));
}

function getUnMatchedPosts(posts, keyword){
    return posts.filter(({postTitle}) => !postTitle.includes(keyword));
}

function onClickSearchBtn(){
    const keyword = document.getElementById('search-posts').value;
    let posts = GetAllRegisteredPosts()
    if(selected == 'like'){
        posts = GetAllLikedPosts()
    }

    const MatchedPosts = getMatchedPosts(posts, keyword);
    const unMatchedPosts = getUnMatchedPosts(posts, keyword);
    ShowPosts(MatchedPosts);
    HidePosts(unMatchedPosts);
}
