const canvas = document.querySelector("#minCanvas");
const ctx = canvas.getContext("2d");
const objlist = [];

class Form{
    constructor(x,y,velocity_x,velocity_y,color){
        this.x = x;
        this.y = y;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.color = color;
        this.acceleration = 1;
        this.isActive = true;
        objlist.push(this);
    }
    update(){
        if (!this.isActive) return;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
        this.x *= this.acceleration;
        this.y *= this.acceleration;
    }
   detect_collision(e) {
        let t = this;
        if (!e.isActive) return;

        let from_left = (t.x + t.width >= e.x);
        let from_right = (t.x <= e.x + e.width);
        let from_down = (t.y <= e.y + e.height);
        let from_up = (t.y + t.height >= e.y);

        if (from_left && from_right && from_up && from_down) {
            
            let overLapX = Math.min(t.x + t.width - e.x, e.x + e.width - t.x);
            let overLapY = Math.min(t.y + t.height - e.y, e.y + e.height - t.y);

            if (overLapX < overLapY) {
                t.velocity_x *= -1;
                e.velocity_x *= -1;

                if (t.x < e.x) {
                    t.x -= overLapX / 2;
                    e.x += overLapX / 2;
                } else {
                    t.x += overLapX / 2;
                    e.x -= overLapX / 2;
                }
            } else {
                t.velocity_y *= -1;
                e.velocity_y *= -1;

                if (t.y < e.y) {
                    t.y -= overLapY / 2;
                    e.y += overLapY / 2;
                } else {
                    t.y += overLapY / 2;
                    e.y -= overLapY / 2;
                }
            }
            
        }
    }
}
class Player extends Form{
    constructor(x,y,width,height,velocity_x,velocity_y,color){
        super(x,y,velocity_x,velocity_y,color)
        this.width = width;
        this.height = height;
    }
}
function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //upptaterar alla objekt som är i objlist arrayen
    //Måste vara objlist.push(this) i varje class för att lägga in dom en objlist
    objlist.forEach(e=> e.update());
    //Kollar Kollisionen
    for (let i = 0; i < objList.length; i++) {
        for (let j = i + 1; j < objList.length; j++) {
            objList[i].detect_collision(objList[j]);
        }
    }
    // ritar ut alla objekt som är i objlist arrayen
    objlist.forEach(e => e.draw());
    requestAnimationFrame(gameloop);
};
gameloop();