const canvas = document.querySelector("#minCanvas");
const ctx = canvas.getContext("2d");
const objlist = [];



function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //upptaterar alla objekt som är i objlist arrayen
    objlist.forEach(e=> e.update());

    // ritar ut alla objekt som är i objlist arrayen
    objlist.forEach(e => e.draw());
    requestAnimationFrame(gameloop);
};
gameloop();