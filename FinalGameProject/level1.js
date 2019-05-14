//test
//sameeh hi

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hero = new Hero(0, canvas.height - 200, ctx);
let skeletonBoss = new SkeletonBoss(1400, 200, ctx, hero);
let interface = new Interface(
  skeletonBoss.healBar,
  canvas.width / 2 - 350,
  60,
  ctx
);
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

let background = new Image();
background.src = "./img/background.jpg";
background.onload = () => {
  main();
};

let main = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  hero.draw();
  skeletonBoss.draw();
  interface.draw();
  hero.update(keysDown);
  skeletonBoss.update();
  requestAnimationFrame(main);
};
