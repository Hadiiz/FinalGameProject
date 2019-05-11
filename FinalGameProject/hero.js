class Hero {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/hero-Sheet.png";
    this.imgH = 150;
    this.imgW = 200;
    this.framesCount = 0;
    this.tickCounter = 0;
    this.ticksPerFrame = 10;
    this.x = x;
    this.y = y;
    this.ground = y;

    this.jumpHeight = this.ground - 220;
    this.jumpState = 0;

    this.idle = false;
    this.landed = true;
  }

  draw = () => {
    this.ctx.drawImage(
      this.img,
      this.framesCount * this.imgW,
      0,
      this.imgW,
      this.imgH,
      this.x,
      this.y,
      this.imgW,
      this.imgH
    );
  };
  update = keysDown => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.framesCount++;
      this.framesCount = this.framesCount % 8;
    }

    if (37 in keysDown) {
      this.x -= 2;
    }
    if (39 in keysDown) {
      this.x += 2;
    }
    if (32 in keysDown && this.landed == true) {
      this.landed = false;
    }

    /////////////////////////////////////////////////
    //JUMP
    if (this.landed == false) {
      if (this.jumpState == 0) {
        if (this.y == this.jumpHeight) this.jumpState = 1;
        this.y -= 4;
      }
      if (this.jumpState == 1) {
        this.y += 4;
        if (this.y == this.ground) {
          this.landed = true;
          this.jumpState = 0;
        }
      }
    }
  };
}
