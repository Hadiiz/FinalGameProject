function drawrect(context, color, x, y, length, height, col2) {
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(x, y, length, height);
  context.lineWidth = 4;
  context.strokeStyle = col2;
  context.stroke();
}
function collision(x1, y1, h1, w1, x2, y2, h2, w2) {
  if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) return true;
}

class background {
  BackgroundImage = new Image();
  draw() {
    this.BackgroundImage.src = "img/BackgroundLVL2.jpg";
    ctx.drawImage(this.BackgroundImage, 0, 0, canvas.width, canvas.height);
  }
}
class Level2 {
  constructor(ctx, canvas, keysDown) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keysDown = keysDown;

    this.sprites = [];
    this.deletearray = [];
    this.enemysprites = [];
    this.enemydeletearray = [];
    this.hero = new Hero(0, this.canvas.height - 250, this.ctx, 2);
    this.gameOver = new Image();
    this.gameOver.src = "img/gameover.jpg";
    this.Boss = new boss(
      1000,
      300,
      this.hero,
      this.sprites,
      this.deletearray,
      this.ctx
    );
    this.Background = new background();
    this.GameOver = false;
  }
  main = () => {
    if (this.GameOver == false) {
      this.Background.draw();
      this.hero.draw();
      this.hero.update(this.keysDown);
      this.Boss.draw();
      this.Boss.update();

      for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].update(this.hero.x, this.hero.y);
        this.sprites[i].draw();
      }
      //deleting unused sprites member
      for (var j = 0; j < this.deletearray.length; j++) {
        var indexof = this.sprites.indexOf(this.deletearray[j]);
        this.sprites.splice(indexof, 1);
      }
      //emptying the delete array
      this.deletearray = [];

      if (this.hero.life2 <= 0) {
        this.GameOver = true;
      }
    }
    if (this.GameOver == true) {
      this.ctx.drawImage(
        this.gameOver,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  };
}
