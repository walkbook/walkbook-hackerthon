function myWalkroad() {
    walkroads = my_walkroads;
    walkroad_paths = my_walkroad_paths;

    const likeWalkroadBtn = document.getElementById('like-walkroad-button');
    const myWalkroadBtn = document.getElementById('my-walkroad-button');
    likeWalkroadBtn.disabled = false;
    myWalkroadBtn.disabled = true;

    removeOverlays();
    draw()
}

function likeWalkroad() {
    walkroads = like_walkroads;
    walkroad_paths = like_walkroad_paths;

    const likeWalkroadBtn = document.getElementById('like-walkroad-button');
    const myWalkroadBtn = document.getElementById('my-walkroad-button');
    likeWalkroadBtn.disabled = true;
    myWalkroadBtn.disabled = false;

    removeOverlays();
    draw()
}

