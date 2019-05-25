class Level1 {
  constructor(ctx, canvas, keysDown) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keysDown = keysDown;
    this.hero = new Hero(0, this.canvas.height - 200, this.ctx, 1, this.canvas);

    this.skeletonBoss = new SkeletonBoss(
      this.canvas.width - 500,
      200,
      this.ctx,
      this.hero
    );
    this.interface = new Interface(
      this.skeletonBoss.healBar,
      this.canvas.width / 2 - 350,
      60,
      this.ctx
    );
    this.deleted = [];

    this.background = new Image();
    this.background.src = "img/background.jpg";
    this.background.onload = () => {};
    this.gameOver = new Image();
    this.gameOver.src = "img/gameover.jpg";
    this.GameOver = false;
  }

  stop = () => {
    this.skeletonBoss.stop = true;
  };
  main = () => {
    if (this.GameOver == false) {
      this.ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
      this.hero.draw();
      this.skeletonBoss.draw();
      this.interface.drawBossHealthBar();
      this.interface.drawHeroHeart(this.hero.lives);
      this.hero.update(keysDown);
      this.skeletonBoss.update();
      this.checkForCollision(this.hero.bullet, this.skeletonBoss);

      if (this.hero.lives == 0) {
        this.GameOver = true;
      }
    }
    if (this.GameOver == true) {
      this.stop();
      this.ctx.drawImage(this.gameOver, 0, 0, canvas.width, canvas.height);
    }
  };

  checkForCollision = (bullet, boss) => {
    let bossX1 = boss.x + 130;
    let bossX2 = bossX1 + 270;
    let bossY1 = boss.y + 150;
    let bossY2 = bossY1 + 180;

    for (let i = 0; i < bullet.length; i++) {
      if (
        bullet[i].x2 > bossX1 &&
        bullet[i].x2 < bossX2 &&
        bullet[i].y2 < bossY2 &&
        bullet[i].y2 > bossY1
      ) {
        this.hero.deleted.push(bullet[i]);
        boss.healthBar -= 5;
        this.interface.updateBossHealth();
        console.log(boss.healthBar);
      }
    }
  };
}
