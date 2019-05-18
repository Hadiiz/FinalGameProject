class HeroBullet {
  constructor(x, y, ctx) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = this.x1 + 40;
    this.y2 = this.y1 + 5;
    this.ctx = ctx;
  }

  draw = () => {
    this.ctx.fillStyle = "lime";
    this.ctx.fillRect(this.x1, this.y1, 40, 5);
  };

  update = () => {
    this.x1 += 10;
    this.x2 += 10;
  };
}
