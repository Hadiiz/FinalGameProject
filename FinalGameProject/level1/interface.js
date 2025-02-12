class Interface {
  constructor(BHB, BHBX, BHBY, ctx) {
    this.BHB = BHB;
    this.BHBX = BHBX;
    this.BHBY = BHBY;
    this.ctx = ctx;

    this.bossHealthW = 700;

    this.bossHBImg = new Image();
    this.bossHBImg.src = "./img/bossHB.png";
    this.heroHeartImg = new Image();
    this.heroHeartImg.src = "./img/HeroHeart.png";
  }

  drawBossHealthBar = () => {
    this.ctx.fillStyle = "#ad0000";
    this.ctx.fillRect(this.BHBX, this.BHBY, this.bossHealthW, 30);
    this.ctx.fillStyle = "#860000";
    this.ctx.fillRect(this.BHBX, this.BHBY + 18, this.bossHealthW, 12);
    this.ctx.fillStyle = "#be2000";
    this.ctx.fillRect(this.BHBX, this.BHBY, this.bossHealthW, 3);

    this.ctx.drawImage(this.bossHBImg, this.BHBX - 45, this.BHBY - 10);
  };

  drawHeroHeart = lives => {
    let x = 40;
    for (let i = 0; i < lives; i++) {
      this.ctx.drawImage(this.heroHeartImg, x, 30);
      x += 30;
    }
  };

  updateBossHealth = () => {
    this.bossHealthW -= 11.66;
  };
}
