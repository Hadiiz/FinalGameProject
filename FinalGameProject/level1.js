let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hero = new Hero(0, canvas.height - 200, ctx);
let skeletonBoss = new SkeletonBoss(1400, 200, ctx, hero);

var keysDown = {};

addEventListener(
  "keydown",
  function(e) {
    keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function(e) {
    delete keysDown[e.keyCode];
  },
  false
);

let main = () => {
  ctx.fillStyle = "purple";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  hero.draw();
  skeletonBoss.draw();
  hero.update(keysDown);
  requestAnimationFrame(main);
};

main();
