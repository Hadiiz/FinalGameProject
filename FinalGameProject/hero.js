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

    this.idleY = 150;
    this.walkingY = 0;

    this.ground = y;

    this.jumpHeight = this.ground - 220;
    this.jumpState = 0;
    this.jumpSpeed = 6;

    this.idle = true;
    this.landed = true;

    this.fire = true;
    this.bulletHotSpotX;
    this.bulletHotSpotY;
    this.bullet = [];
    this.deleted = [];
    var _this = this;
    setInterval(function() {
      _this.fire = true;
    }, 600);

    this.lives = 5;
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
  update = keysDown => {
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
        this.y -= 2 * this.jumpSpeed;
        this.jumpSpeed -= 0.1;
      }
      if (this.jumpState == 1) {
        this.jumpSpeed += 0.1;
        this.y += 2 * this.jumpSpeed;
        if (this.y >= this.ground) {
          this.landed = true;
          this.jumpState = 0;
        }
      }
    }

    for (let i = 0; i < this.bullet.length; i++) {
      this.bullet[i].update();
    }

    for (let i = 0; i < this.deleted.length; i++) {
      let index = this.bullet.indexOf(this.deleted[i]);
      if (index > -1) this.bullet.splice(index, 1);
    }
  };
}
