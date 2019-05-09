class Hero {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/hero-Sheet.png";
    this.imgH = 150;
    this.imgW = 200;
    this.framesCount = 0;
    this.tickCounter = 0;
    this.ticksPerFrame = 7;
    this.x = x;
    this.y = y;
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
  update = () => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.framesCount++;
      this.framesCount = this.framesCount % 8;
    }
  };
}
