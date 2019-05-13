class HeroBullet {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  draw = () => {
    this.ctx.fillStyle = "lime";
    this.ctx.fillRect(this.x, this.y, 40, 5);
  };

  update = () => {
    this.x += 10;
  };
}
