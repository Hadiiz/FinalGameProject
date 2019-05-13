class Interface {
  constructor(BHB, BHBX, BHBY, ctx) {
    this.BHB = BHB;
    this.BHBX = BHBX;
    this.BHBY = BHBY;
    this.ctx = ctx;

    this.bossHBImg = new Image();
    this.bossHBImg.src = "./img/bossHB.png";
  }

  draw = () => {
    this.ctx.fillStyle = "#ad0000";
    this.ctx.fillRect(this.BHBX, this.BHBY, 700, 30);
    this.ctx.fillStyle = "#860000";
    this.ctx.fillRect(this.BHBX, this.BHBY + 18, 700, 12);
    this.ctx.fillStyle = "#be2000";
    this.ctx.fillRect(this.BHBX, this.BHBY, 700, 3);

    this.ctx.drawImage(this.bossHBImg, this.BHBX - 45, this.BHBY - 10);
  };
}
