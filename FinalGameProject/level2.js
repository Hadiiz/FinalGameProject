var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);
var keysDown = {};
addEventListener(
  "keydown",
  function(e) {
    keysDown[e.keyCode] = true;
  },
  false
);
addEventListener(
  "keyup",
  function(e) {
    delete keysDown[e.keyCode];
  },
  false
);
var sprites = [];
var deletearray = [];
var enemysprites = [];
var enemydeletearray = [];
function drawrect(context, color, x, y, length, height, col2) {
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(x, y, length, height);
  context.lineWidth = 4;
  context.strokeStyle = col2;
  context.stroke();
}
function collision(x1, y1, h1, w1, x2, y2, h2, w2) {
  if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) return true;
}
class background {
  BackgroundImage = new Image();
  draw() {
    this.BackgroundImage.src = "./Background.jpg";
    ctx.drawImage(this.BackgroundImage, 0, 0, canvas.width, canvas.height);
  }
}
let hero = new Hero(0, canvas.height - 250, ctx);

class Fire {
  x = 0;
  y = 0;
  name = " ";
  fire = new Image();
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
  draw() {
    this.fire.src = "./fireball.png";
    ctx.drawImage(this.fire, this.x, this.y, 55, 55);
  }
  update() {
    this.x -= 5;
    if (this.x < 0) {
      deletearray.push(this);
    }
  }
}

class boss {
  x = 0;
  y = 0;
  imgy = 0;
  bossImage = new Image();
  framesCount = 1;
  framesCount2 = 1;
  width = 320;
  height = 320;
  counter = 0;
  counter2 = 0;
  counter3 = 0;
  counter4 = 0;
  counter5 = 0;
  counter6 = 0;
  top = true;
  bottom = false;
  forward = false;
  change = false;
  backward = false;
  hori = true;
  health = 1000;
  collide = false;
  collid2 = false;
  collide3 = false;
  change2 = true;
  victory = false;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    this.bossImage.src = "./Enemy.png";
    drawrect(ctx, "black", 200, 50, 1000, 20, "black");
    drawrect(ctx, "red", 200, 50, this.health, 20, "red");
    ctx.drawImage(this.bossImage, 0, 0, 320, 320, 120, 10, 80, 80);
    ctx.drawImage(this.bossImage, 0, 0, 320, 320, 1200, 10, 80, 80);
    ctx.drawImage(
      this.bossImage,
      this.framesCount * this.width,
      this.imgy,
      this.width,
      this.height,
      this.x,
      this.y,
      320,
      320
    );
  }
  update() {
    if (this.hori == true) {
      if (this.counter2 == 9) {
        this.framesCount = 0;
        this.counter2 = 0;
      }
      if (this.counter == 30) {
        this.framesCount++;
        this.counter = 0;
        this.counter2 += 1;
      }
      if (this.counter2 == 8) {
        let fire = new Fire(this.x + 120, this.y + 200, "enemy");
        sprites.push(fire);
        this.counter2++;
      }
      this.counter++;
    }

    if (this.hori == true) {
      if (this.top == true) {
        this.y -= 1;
        if (this.y <= 0) {
          this.bottom = true;
          this.top = false;
        }
        if (this.y == 370) {
          this.forward = true;
          this.change = true;
          this.hori = false;
        }
      }
      if (this.bottom == true) {
        this.y++;
        if (this.y + 320 >= 740) {
          this.bottom = false;
          this.top = true;
        }
      }
    }
    if (this.forward == true && this.health > 0) {
      if (this.change == true) {
        this.imgy += 320;
        this.framesCount = 3;
        this.change = false;
      }
      if (this.counter3 == 9) {
        this.framesCount = 2;
        this.counter3 = 0;
      }

      if (this.counter4 == 30) {
        this.framesCount++;
        this.counter3++;
        this.counter4 = 0;
      }
      this.counter4++;
      this.x -= 10;
    }
    if (this.health <= 0) {
      this.health = 0;
      if (this.change2 == true) {
        this.imgy = 640;
        this.framesCount = 2;
        this.change2 = false;
      }
      if (this.counter5 == 9) {
        this.framesCount = 2;
        this.counter5 = 0;
        this.victory = true;
      }

      if (this.counter6 == 30) {
        this.framesCount++;
        this.counter5++;
        this.counter6 = 0;
      }
      this.counter6++;
    }
    if (this.x <= 0) {
      this.framescount = 1;
      this.imgy = 0;
      this.backward = true;
      this.forward = false;
    }
    if (this.backward == true) {
      this.x += 5;
      this.y--;
      if (this.x >= 900) {
        this.backward = false;
        this.hori = true;
        this.counter2 = 0;
        this.counter = 0;
        this.imgy = 0;
        this.framesCount = 0;
      }
    }
    //Boss collide with lazer
    this.collide = collision(
      this.x + 120,
      this.y + 60,
      120,
      200,
      hero.x + hero.shoot.width + 20,
      hero.shoot.y + 30,
      70,
      20
    );
    if (this.collide == true) {
      hero.shoot.collide = true;
      this.health -= 5;
    }
    //Boss colllide with Hero
    this.collide2 = collision(
      this.x + 120,
      this.y + 60,
      120,
      200,
      hero.x + 85,
      hero.y + 20,
      hero.x + 45,
      hero.imgH - 35
    );
    if (hero.shield < 0) {
      hero.shield = 0;
    }
    if (this.collide2 == true) {
      if (hero.shield != 0) hero.shield -= 4;
      else hero.life2 -= 4;
    }
    //Hero Collide with fireBall
    var fireIndex = 0;
    for (var i = 0; i < sprites.length; i++) {
      if (sprites[i].name == "enemy") {
        fireIndex = i;
        this.collide3 = collision(
          hero.x,
          hero.y + 20,
          hero.x + 125,
          hero.imgH - 35,
          sprites[fireIndex].x,
          sprites[fireIndex].y,
          55,
          55
        );
        if (this.collide3 == true) {
          deletearray.push(sprites[i]);
          if (hero.shield != 0) hero.shield -= 15;
          else hero.life2 -= 15;
        }
      }
    }
  }
}
var gameOver = new Image();
gameOver.src = "./gameover.jpg";
var Victory = new Image();
Victory.src = "./victory2.jpg";
let Boss = new boss(1000, 300);
let Background = new background();
var GameOver = false;
var then = Date.now();
var main = function() {
  if (GameOver == false && Boss.victory == false) {
    let now = Date.now();
    let delta = now - then;

    Background.draw();
    hero.draw();
    hero.update(keysDown, delta / 1000);
    Boss.draw();
    Boss.update();

    for (var i = 0; i < sprites.length; i++) {
      sprites[i].update(hero.x, hero.y);
      sprites[i].draw();
    }
    //deleting unused sprites member
    for (var j = 0; j < deletearray.length; j++) {
      var indexof = sprites.indexOf(deletearray[j]);
      sprites.splice(indexof, 1);
    }
    //emptying the delete array
    deletearray = [];
    then = now;
    if (hero.life2 <= 0) {
      GameOver = true;
    }
  }
  if (GameOver == true) {
    ctx.drawImage(gameOver, 0, 0, canvas.width, canvas.height);
  }
  if (Boss.victory == true) {
    ctx.drawImage(Victory, 0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;
main();
