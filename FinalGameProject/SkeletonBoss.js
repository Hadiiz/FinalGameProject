class SkeletonBoss {
  constructor(x, y, ctx, hero) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.hero = hero;
    this.eyeCX = this.x + 160;
    this.eyeCY = this.y + 230;

    this.healthBar = 300;

    this.img = new Image();
    this.img.src = "./img/SkeletonBoss.png";
    this.imgH = 480;
    this.imgW = 480;
    this.framesCount = 0;
    this.tickCounter = 0;
    this.ticksPerFrame = 30;
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
    this.drawEye(this.hero);
  };

  drawEye = hero => {
    let gap;

    switch (this.framesCount) {
      case 0:
        gap = -35;
        break;
      case 1:
        gap = -43;
        break;
      case 2:
        gap = -35;
        break;
      case 3:
        gap = -27;
        break;
    }
    let d = Math.sqrt(
      Math.pow(this.eyeCX - this.hero.x, 2) +
        Math.pow(this.eyeCY - this.hero.y, 2)
    );

    let d2 = 15;
    let eyeX = this.eyeCX - (d2 * (this.eyeCX - this.hero.x)) / d - 2;
    let eyeY = this.eyeCY - (d2 * (this.eyeCY - this.hero.y)) / d - gap;

    /*this.ctx.strokeStyle = "aqua";
    ctx.beginPath();
    this.ctx.moveTo(this.hero.x + 120, this.hero.y + 40);
    this.ctx.lineTo(this.eyeCX, this.eyeCY);
    ctx.stroke();
*/
    this.ctx.fillStyle = "aqua";
    this.ctx.fillRect(eyeX, eyeY, 8, 8);
  };

  update = () => {
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.framesCount++;
      this.framesCount = this.framesCount % 4;
    }
  };
}
