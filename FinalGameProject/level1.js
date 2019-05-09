let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let hero = new Hero(0, 0, ctx);

let main = () => {
  ctx.fillRect(0, 0, 500, 500);
  hero.draw();
  hero.update();
  requestAnimationFrame(main);
};

main();
