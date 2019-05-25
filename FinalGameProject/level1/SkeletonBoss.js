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
    this.img.src = "img/SkeletonBoss.png";
    this.imgH = 480;
    this.imgW = 480;
    this.framesCount = 0;
    this.tickCounter = 0;
    this.ticksPerFrame = 30;

    this.hotSpotX = this.x + 114;
    this.hotSpotY = this.y + 20;

    this.bullet = [];
    this.deleted = [];

    this.stop = false;
    setInterval(this.shoot, 2000);
  }

  draw = () => {
    for (let i = 0; i < this.bullet.length; i++) {
      this.bullet[i].draw();
    }
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

  drawEye = () => {
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

    //TODO REMOVE BULLET AFTER <0
    //FIXME REMOVE
    /*this.ctx.strokeStyle = "aqua";
    ctx.beginPath();
    this.ctx.moveTo(this.hero.x + 120, this.hero.y + 40);
    this.ctx.lineTo(this.eyeCX, this.eyeCY);
    ctx.stroke();
*/
    this.ctx.fillStyle = "aqua";
    this.ctx.fillRect(eyeX, eyeY, 8, 8);
  };

  shoot = () => {
    if (this.stop != true) {
      switch (this.framesCount) {
        case 0:
          this.hotSpotY = this.y + 122;
          break;
        case 1:
          this.hotSpotY = this.y + 130;
          break;
        case 2:
          this.hotSpotY = this.y + 122;
          break;
        case 3:
          this.hotSpotY = this.y + 112;
          break;
      }
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.hotSpotX, this.hotSpotY, 15, 15);

      this.ctx.strokeStyle = "aqua";
      ctx.beginPath();
      this.ctx.moveTo(this.hero.x + 120, this.hero.y + 40);
      this.ctx.lineTo(this.hotSpotX, this.hotSpotY);
      ctx.stroke();

      let m =
        (this.hotSpotY - (this.hero.y + 40)) /
        (this.hotSpotX - (this.hero.x + 120));

      let b = this.hotSpotY - m * this.hotSpotX;

      this.bullet.push(
        new SkeletonBossBullet(this.hotSpotX, this.hotSpotY, this.ctx, m, b)
      );
    }
  };

  update = () => {
    for (let i = 0; i < this.deleted.length; i++) {
      let index = this.bullet.indexOf(this.deleted[i]);
      if (index > -1) this.bullet.splice(index, 1);
    }
    this.tickCounter++;
    if (this.tickCounter > this.ticksPerFrame) {
      this.tickCounter = 0;
      this.framesCount++;
      this.framesCount = this.framesCount % 4;
    }

    //FIXME remove
    for (let i = 0; i < this.bullet.length; i++) {
      this.bullet[i].update();
      if (this.bullet[i].x < 0) {
        this.deleted.push(this.bullet[i]);
      }
      if (
        this.bullet[i].x > this.hero.x + 80 &&
        this.bullet[i].x < this.hero.x + 135 &&
        this.bullet[i].y > this.hero.y + 14 &&
        this.bullet[i].y < this.hero.y + 185
      ) {
        this.deleted.push(this.bullet[i]);
        this.hero.lives--;
      }
    }
  };
}
