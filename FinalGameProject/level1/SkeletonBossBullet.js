class SkeletonBossBullet {
  constructor(x, y, ctx, m, b) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.m = m;
    this.b = b;
    this.sound = new Audio("audio/SkeletonBossBullet.mp3");
    this.sound.play();
    this.sound.volume = 0.1;
  }

  draw = () => {
    this.ctx.strokeStyle = "#ff7600";
    this.ctx.fillStyle = "#ff7600";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    this.ctx.strokeStyle = "#ff7600";
    this.ctx.fillStyle = "#eeb03e";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 13, 0, 2 * Math.PI);
    ctx.fill();

    this.ctx.fillStyle = "#e0d15a";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  update = () => {
    this.x -= 10;
    this.y = this.m * this.x + this.b;
  };
}
