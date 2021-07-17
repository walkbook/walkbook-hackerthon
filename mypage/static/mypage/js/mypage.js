import { feature } from './feature.js';

(() => {
    const registeredPosts = document.getElementById('registered-posts');
    registeredPosts.onclick = () => feature.onClickRegisteredPosts();
})();

(() => {
    const likedPosts = document.getElementById('liked-posts');
    likedPosts.onclick = () => feature.onClickLikedPosts();
})();

(() => {
    const searchPostBtn = document.getElementById('search-posts-btn');
    searchPostBtn.onclick = () => feature.onClickSearchBtn();
})();
