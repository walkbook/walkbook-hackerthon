const MyPosts = {
    selected : 'register',
    walkroads : my_walkroads,
    walkroad_paths : my_walkroad_paths,

    onClickRegisteredPosts() {
        const registeredPosts = this.GetAllRegisteredPosts();
        const likedPosts = this.GetAllLikedPosts();
        this.ShowPosts(registeredPosts);
        this.HidePosts(likedPosts);
        this.selected = 'register';
        removeOverlays();
        draw()
    },
    
    onClickLikedPosts() {
        const registeredPosts = this.GetAllRegisteredPosts();
        const likedPosts = this.GetAllLikedPosts();
        this.ShowPosts(likedPosts);
        this.HidePosts(registeredPosts);
        this.selected = 'like';
        removeOverlays();
        draw()
    },

    GetAllRegisteredPosts() {
        const RegisteredPosts = Array.from(document.querySelectorAll('.registered-post'));
        return RegisteredPosts.map((post) => ({
			post,
			postTitle: post.textContent.trim(),
		}));
    },

    GetAllLikedPosts() {
        const LikedPosts = Array.from(document.querySelectorAll('.liked-post'));
        return LikedPosts.map((post) => ({
			post,
			postTitle: post.textContent.trim(),
		}));
    },

    ShowPosts(posts) {
        return posts.forEach(({post}) => post.classList.remove('hide'));
    },

    HidePosts(posts) {
        return posts.forEach(({post}) => post.classList.add('hide'));
    },

    getMatchedPosts(posts, keyword){
        return posts.filter(({postTitle}) => postTitle.includes(keyword));
    },

    getUnMatchedPosts(posts, keyword){
        return posts.filter(({postTitle}) => !postTitle.includes(keyword));
    },

    onClickSearchBtn(){
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
};
