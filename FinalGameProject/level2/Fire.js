class Fire {
  x = 0;
  y = 0;
  name = " ";

  constructor(x, y, name, ctx, deletearray) {
    this.fire = new Image();
    this.fire.src = "img/fireball.png";
    this.x = x;
    this.y = y;
    this.name = name;
    this.ctx = ctx;
    this.deletearray = deletearray;
    this.fireBallAudio = new Audio("audio/Boss2FireBall.mp3");
    this.fireBallAudio.volume = 0.3;
    this.fireBallAudio.play();
  }
  draw() {
    this.ctx.drawImage(this.fire, this.x, this.y, 55, 55);
  }
  update() {
    this.x -= 5;
    if (this.x < 0) {
      this.deletearray.push(this);
    }
  }
}
