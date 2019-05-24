class boss {
  x = 0;
  y = 0;
  imgy = 0;
  bossImage = new Image();
  framesCount = 1;
  framesCount2 = 1;
  width = 320;
  height = 320;
  counter = 0;
  counter2 = 0;
  counter3 = 0;
  counter4 = 0;
  counter5 = 0;
  counter6 = 0;
  top = true;
  bottom = false;
  forward = false;
  change = false;
  backward = false;
  hori = true;
  health = 1000;
  collide = false;
  collid2 = false;
  collide3 = false;
  change2 = true;
  constructor(x, y, hero, sprites, deletearray, ctx) {
    this.ctx = ctx;
    this.deletearray = deletearray;
    this.x = x;
    this.y = y;
    this.hero = hero;
    this.sprites = sprites;
  }
  draw() {
    this.bossImage.src = "img/Enemy.png";
    drawrect(ctx, "black", 200, 50, 1000, 20, "black");
    drawrect(ctx, "red", 200, 50, this.health, 20, "red");
    ctx.drawImage(this.bossImage, 0, 0, 320, 320, 120, 10, 80, 80);
    ctx.drawImage(this.bossImage, 0, 0, 320, 320, 1200, 10, 80, 80);
    ctx.drawImage(
      this.bossImage,
      this.framesCount * this.width,
      this.imgy,
      this.width,
      this.height,
      this.x,
      this.y,
      320,
      320
    );
  }
  update() {
    if (this.hori == true) {
      if (this.counter2 == 9) {
        this.framesCount = 0;
        this.counter2 = 0;
      }
      if (this.counter == 30) {
        this.framesCount++;
        this.counter = 0;
        this.counter2 += 1;
      }
      if (this.counter2 == 8) {
        let fire = new Fire(
          this.x + 120,
          this.y + 200,
          "enemy",
          this.ctx,
          this.deletearray
        );
        this.sprites.push(fire);
        this.counter2++;
      }
      this.counter++;
    }

    if (this.hori == true) {
      if (this.top == true) {
        this.y -= 1;
        if (this.y <= 0) {
          this.bottom = true;
          this.top = false;
        }
        if (this.y == 370) {
          this.forward = true;
          this.change = true;
          this.hori = false;
        }
      }
      if (this.bottom == true) {
        this.y++;
        if (this.y + 320 >= 740) {
          this.bottom = false;
          this.top = true;
        }
      }
    }
    if (this.forward == true && this.health > 0) {
      if (this.change == true) {
        this.imgy += 320;
        this.framesCount = 3;
        this.change = false;
      }
      if (this.counter3 == 9) {
        this.framesCount = 2;
        this.counter3 = 0;
      }

      if (this.counter4 == 30) {
        this.framesCount++;
        this.counter3++;
        this.counter4 = 0;
      }
      this.counter4++;
      this.x -= 10;
    }
    if (this.health <= 0) {
      this.health = 0;
      if (this.change2 == true) {
        this.imgy = 640;
        this.framesCount = 2;
        this.change2 = false;
      }
      if (this.counter5 == 9) {
        this.framesCount = 2;
        this.counter5 = 0;
      }

      if (this.counter6 == 30) {
        this.framesCount++;
        this.counter5++;
        this.counter6 = 0;
      }
      this.counter6++;
    }
    if (this.x <= 0) {
      this.framescount = 1;
      this.imgy = 0;
      this.backward = true;
      this.forward = false;
    }
    if (this.backward == true) {
      this.x += 5;
      this.y--;
      if (this.x >= 900) {
        this.backward = false;
        this.hori = true;
        this.counter2 = 0;
        this.counter = 0;
        this.imgy = 0;
        this.framesCount = 0;
      }
    }
    //Boss collide with lazer
    this.collide = collision(
      this.x + 120,
      this.y + 60,
      120,
      200,
      this.hero.x + this.hero.shoot.width + 20,
      this.hero.shoot.y + 30,
      70,
      20
    );
    if (this.collide == true) {
      this.hero.shoot.collide = true;
      this.health -= 5;
    }
    //Boss colllide with Hero
    this.collide2 = collision(
      this.x + 120,
      this.y + 60,
      120,
      200,
      this.hero.x + 85,
      this.hero.y + 20,
      this.hero.x + 45,
      this.hero.imgH - 35
    );
    if (this.hero.shield < 0) {
      this.hero.shield = 0;
    }
    if (this.collide2 == true) {
      if (this.hero.shield != 0) this.hero.shield -= 4;
      else this.hero.life2 -= 4;
    }
    //Hero Collide with fireBall
    var fireIndex = 0;
    for (var i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i].name == "enemy") {
        fireIndex = i;
        this.collide3 = collision(
          this.hero.x,
          this.hero.y + 20,
          this.hero.x + 125,
          this.hero.imgH - 35,
          this.sprites[fireIndex].x,
          this.sprites[fireIndex].y,
          55,
          55
        );
        if (this.collide3 == true) {
          this.deletearray.push(this.sprites[i]);
          if (this.hero.shield != 0) this.hero.shield -= 15;
          else this.hero.life2 -= 15;
        }
      }
    }
  }
}
