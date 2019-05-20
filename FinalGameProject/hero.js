var deletearray1 = [];
var start2 = true;
class Hero {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "./img/hero-Sheet.png";
    this.imgH = 150;
    this.imgW = 200;
    this.framesCount = 0;
    this.tickCounter = 0;
    this.ticksPerFrame = 10;
    this.level2 = true;
    this.idleY = 150;
    this.walkingY = 0;
    this.level1 = false;
    this.ground = y;
    this.shoot = 0;
    this.jumpHeight = this.ground - 220;
    this.jumpState = 0;
    this.jumpSpeed = 800;
    this.idle = true;
    this.landed = true;
    this.fire = true;
    this.bulletHotSpotX;
    this.bulletHotSpotY;
    this.bullet = [];
    this.sprites1 = [];
    this.deleted = [];
    var _this = this;
    setInterval(function() {
      _this.fire = true;
    }, 600);

    this.lives = 4;
  }

  draw = () => {
    for (let i = 0; i < this.bullet.length; i++) {
      this.bullet[i].draw();
    }
    if (this.idle == false || this.landed == false)
      this.ctx.drawImage(
        this.img,
        this.framesCount * this.imgW,
        this.walkingY,
        this.imgW,
        this.imgH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    else {
      this.ctx.drawImage(
        this.img,
        0,
        this.idleY,
        this.imgW,
        this.imgH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    }
  };
  update = (keysDown, modifier) => {
    ////////////////////////////////////////////////////////////////////////////////

    if (this.landed == true && this.idle == false) {
      this.tickCounter++;
      if (this.tickCounter > this.ticksPerFrame) {
        this.tickCounter = 0;
        this.framesCount++;
        this.framesCount = this.framesCount % 8;
      }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //Walk
    this.idle = true;
    if (37 in keysDown) {
      this.x -= 2;
      this.idle = false;
      this.walkingY = 300;
      this.idleY = 450;
    }
    if (39 in keysDown) {
      this.x += 2;
      this.idle = false;
      this.walkingY = 0;
      this.idleY = 150;
    }
    if (32 in keysDown && this.landed == true) {
      this.landed = false;
    }
    ////////////////////////////////////////////////////////////////////////////////
    //Bullet
    if (this.level1 == true) {
      if (90 in keysDown && this.fire == true) {
        this.bulletHotSpotX = this.x + 95;
        this.bulletHotSpotY = this.y + 30;
        this.bullet.push(
          new HeroBullet(this.bulletHotSpotX, this.bulletHotSpotY, this.ctx)
        );
        this.fire = false;
      }
    }
    if (this.level2 == true) {
      if (90 in keysDown) {
        if (start2 == true) {
          this.shoot = new Laser(this.x, this.y, "level2", this.ctx);
          this.sprites1.push(this.shoot);
          delete keysDown[90];
          this.shoot.start = false;
          start2 = false;
        }
      }
    }

    // console.log(this.fire);
    if (90 in keysDown && this.fire == true) {
      this.bulletHotSpotX = this.x + 95;
      this.bulletHotSpotY = this.y + 30;
      this.bullet.push(
        new HeroBullet(this.bulletHotSpotX, this.bulletHotSpotY, this.ctx)
      );
      this.fire = false;
    }
    /////////////////////////////////////////////////
    //JUMP
    if (this.landed == false) {
      this.framesCount = 7;
      if (this.jumpState == 0) {
        if (this.jumpSpeed <= 0) this.jumpState = 1;
        this.y -= 2 * this.jumpSpeed * modifier;
        this.jumpSpeed -= 10;
      }
      if (this.jumpState == 1) {
        this.jumpSpeed += 10;
        this.y += 2 * this.jumpSpeed * modifier;
        if (this.y >= this.ground) {
          this.landed = true;
          this.jumpState = 0;
        }
      }
    }

    for (let i = 0; i < this.bullet.length; i++) {
      this.bullet[i].update(this.x, this.y);
    }
    for (let i = 0; i < this.sprites1.length; i++) {
      this.sprites1[i].update(this.x, this.y);
      if (this.sprites1[i].coolingdown == false) this.sprites1[i].draw();
    }
    for (var j = 0; j < deletearray1.length; j++) {
      var indexof = this.sprites1.indexOf(deletearray1[j]);
      this.sprites1.splice(indexof, 1);
    }
    //emptying the delete array
    deletearray1 = [];

    for (let i = 0; i < this.deleted.length; i++) {
      let index = this.bullet.indexOf(this.deleted[i]);
      if (index > -1) this.bullet.splice(index, 1);
    }
  };
}
class Laser {
  x = 0;
  y = 0;
  width = 0;
  name = " ";
  laserImage = new Image();
  laserWidth = 0;
  lasertime = 0;
  coolDown = 0;
  collide = false;
  coolingdown = false;
  constructor(x, y, name, ctx) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.ctx = ctx;
  }
  draw() {
    this.laserImage.src = "./laser.png";
    this.ctx.drawImage(
      this.laserImage,
      this.x + 100,
      this.y + 30,
      this.width,
      15
    );
  }
  update(x, y) {
    if (this.collide == false) {
      this.width += 10;
    }
    if (this.collide == true && this.coolingdown == true) {
      this.width = 0;
    }
    this.laserWidth = this.width + this.x;
    this.x = x;
    this.y = y;
    if (this.coolingdown == false) this.lasertime++;
    if (this.coolingdown == true) this.lasertime -= 1.4;
    ctx.fillStyle = "rgb(250, 110, 95)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("BrainHeat: ", 200, 680);
    drawrect(this.ctx, "black", 200, 700, 210, 20, "black");
    drawrect(this.ctx, "orange", 200, 700, this.lasertime, 20, "orange");
    if (this.lasertime == 210) {
      this.coolingdown = true;
    }
    if (this.coolingdown == true) {
      this.coolDown++;
      if (this.coolDown == 150) {
        start2 = true;
        this.coolingdown == false;
        deletearray1.push(this);
      }
    }
  }
}
function drawrect(context, color, x, y, length, height, col2) {
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(x, y, length, height);
  context.lineWidth = 4;
  context.strokeStyle = col2;
  context.stroke();
}
