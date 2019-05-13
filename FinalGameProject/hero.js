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
  }

  draw = () => {
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
    if (this.landed == true && this.idle == false) {
      this.tickCounter++;
      if (this.tickCounter > this.ticksPerFrame) {
        this.tickCounter = 0;
        this.framesCount++;
        this.framesCount = this.framesCount % 8;
      }
    }
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
  };
}
