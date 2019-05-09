class Hero {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/hero-Sheet.png";
  }

  draw = () => {
    this.ctx.drawImage(this.img, 0, 0);
  };
}
