let selected = 'register';

function onClickRegisteredPosts() {
    const registeredPosts = this.GetAllRegisteredPosts();
    const likedPosts = this.GetAllLikedPosts();
    this.ShowPosts(registeredPosts);
    this.HidePosts(likedPosts);
    this.selected = 'register';
    walkroads = my_walkroads;
    walkroad_paths = my_walkroad_paths;
    removeOverlays();
    draw()
}

function onClickLikedPosts() {
    const registeredPosts = this.GetAllRegisteredPosts();
    const likedPosts = this.GetAllLikedPosts();
    this.ShowPosts(likedPosts);
    this.HidePosts(registeredPosts);
    this.selected = 'like';
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

function ShowPosts(posts) {
    return posts.forEach(({post}) => post.classList.remove('hide'));
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
    let posts = this.GetAllRegisteredPosts()
    if(this.selected == 'like'){
        posts = this.GetAllLikedPosts()
    }

    const MatchedPosts = this.getMatchedPosts(posts, keyword);
    const unMatchedPosts = this.getUnMatchedPosts(posts, keyword);
    this.ShowPosts(MatchedPosts);
    this.HidePosts(unMatchedPosts);
}
