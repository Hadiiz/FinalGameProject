class SkeletonBoss {
  constructor(x, y, ctx, hero) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.hero = hero;
    this.eyeCX = this.x + 160;
    this.eyeCY = this.y + 230;

    this.image = new Image();
    this.image.src = "./img/SkeletonBoss.png";
  }

  draw = () => {
    this.ctx.drawImage(this.image, 0, 0, 480, 480, this.x, this.y, 480, 480);
    this.drawEye(this.hero);
  };

  drawEye = hero => {
    let d = Math.sqrt(
      Math.pow(this.eyeCX - this.hero.x, 2) +
        Math.pow(this.eyeCY - this.hero.y, 2)
    );

    let d2 = 15;
    let eyeX = this.eyeCX - (d2 * (this.eyeCX - this.hero.x)) / d - 2;
    let eyeY = this.eyeCY - (d2 * (this.eyeCY - this.hero.y)) / d - 2;

    /*this.ctx.strokeStyle = "aqua";
    ctx.beginPath();
    this.ctx.moveTo(this.hero.x + 120, this.hero.y + 40);
    this.ctx.lineTo(this.eyeCX, this.eyeCY);
    ctx.stroke();
*/
    this.ctx.fillStyle = "aqua";
    this.ctx.fillRect(eyeX, eyeY, 8, 8);
  };
}
