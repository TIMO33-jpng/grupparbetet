const canvas = document.querySelector("#minCanvas");
const ctx = canvas.getContext("2d");
const objlist = [];

document.addEventListener('click', function (e) {
    if (e.target.id === 'Startbutton') {
        setTimeout(() => {
            objlist.forEach(obj =>
                obj.isActive = true
            )
        }, 3000)
        alert("starts in 3 seconds")
    }
})
document.addEventListener('click', function (e) {
    if (e.target.id === 'Resetbutton') {
        alert("Everything Reseted")
            objlist.forEach(obj => {
                obj.resetposition();
                obj.isActive = false;
            });

            player.isActive = true;
    }
})


//kollar efter tangettryck
class Keyboard {
    static validKeys = ['W', 'A', 'D', 'S'];
    static keystates = {};

    static addListeners() {
        document.addEventListener('keydown', function (e) {
            let ks = e.key.toUpperCase();
            if (Keyboard.validKeys.includes(ks))
                Keyboard.keystates[ks] = true;
        });

        document.addEventListener('keyup', function (e) {
            let ks = e.key.toUpperCase();
            if (Keyboard.validKeys.includes(ks))
                Keyboard.keystates[ks] = false;
        });

    }

    static isDown(key) {
        //!! converts into a strict boolean (true or false)
        return !!Keyboard.keystates[key.toUpperCase()];
    }

}

Keyboard.addListeners();

//Generel form class typ
class Form {
    constructor(x, y, velocity_x, velocity_y, color) {
        this.x = x;
        this.y = y;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.color = color;
        this.acceleration = 1;
        this.startX = x;
        this.startY = y;
        this.isActive = false;
        objlist.push(this);
    }
    update() {
        if (!this.isActive) return;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
        this.x *= this.acceleration;
        this.y *= this.acceleration;
    }
    resetposition() {
        this.x = this.startX;
        this.y = this.startY;
    }
    detect_collision() { }
    /* detect_collision(e) {
          let t = this;
          if (!e.isActive) return;
  
          let from_left = (t.x + t.width >= e.x);
          let from_right = (t.x <= e.x + e.width);
          let from_down = (t.y <= e.y + e.height);
          let from_up = (t.y + t.height >= e.y);
  
          if (from_left && from_right && from_up && from_down) {
                  //Ska bara vara För player egentligen
                  this.isActive = false;
              }
              
          }
          */
}
class Player extends Form {
    constructor(x, y, width, height, velocity_x, velocity_y, color) {
        super(x, y, velocity_x, velocity_y, color)
        this.width = width;
        this.height = height;
        this.isActive = true;
    }
    update() {

        //Ändrar hastighetet på värdet av this.velocity_x = -3; för att gå snabare åt vänster och plus för att gå åt höger
        //Samma gäller velocity_Y med upp o ner där är -3 och upp blir 3 

        if (Keyboard.isDown('A')) {
            this.velocity_x = -3;
        }
        else if (Keyboard.isDown('D')) {
            this.velocity_x = 3;
        }
        else {
            this.velocity_x = 0;
        }
        if (Keyboard.isDown('W')) {
            this.velocity_y = -3;
        }
        else if (Keyboard.isDown('S')) {
            this.velocity_y = 3;
        }
        else {
            this.velocity_y = 0;
        }
        super.update();
    }
    detect_collision(e) {
        let t = this;
        if (!e.isActive || e === this) return;

        let from_left = (t.x + t.width >= e.x);
        let from_right = (t.x <= e.x + e.width);
        let from_down = (t.y <= e.y + e.height);
        let from_up = (t.y + t.height >= e.y);

        if (from_left && from_right && from_up && from_down) {
            //Ska bara vara För player egentligen
            this.isActive = false;
        }

    }
    draw() {
        if (!this.isActive) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
class rotten extends Form {
    constructor(x, y, width, height, velocity_x, velocity_y, color) {
        super(x, y, velocity_x, velocity_y, color)
        this.width = width;
        this.height = height;
        this.isActive = false;
    }
    update() {
        super.update()
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.velocity_x *= -1;
        }
        if (this.y <= 0 || this.y + this.height >= canvas.height) {
            this.velocity_y *= -1;
        }
    }
    draw() {
        if (!this.isActive) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
//Här ska alla objekt som ska målas vara
const player = new Player(215, 215, 20, 20, 0, 0, "red")
new rotten(180, 180, 10, 10, 1, 0, "purple")
new rotten(100, 50, 20, 20, 1, 1, "yellow")
new rotten(50, 25, 20, 20, -3, 4, "green")
new rotten(50, 25, 20, 20, 4, -2, "blue")

function gameloop() {
    if (!this.isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //upptaterar alla objekt som är i objlist arrayen
        //Måste vara objlist.push(this) i varje class för att lägga in dom en objlist
        objlist.forEach(e => e.update());
        //Kollar Kollisionen
        for (let i = 0; i < objlist.length; i++) {
            player.detect_collision(objlist[i]);
        }

        // ritar ut alla objekt som är i objlist arrayen
        objlist.forEach(e => e.draw());

    }
    if (!player.isActive) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(gameloop);
};
gameloop();
