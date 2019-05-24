let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundmenu = new Image();
backgroundmenu.src = "img/MenuBackground.jpg";
let exitBackground = new Image();
exitBackground.src = "img/exit.png";

let chosen = false;
let exit = false;
let gameOver = new Image();
gameOver.src = "img/gameover.jpg";
let GameOver = false;

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

let level1 = new Level1(ctx, canvas, keysDown);
let level2 = new Level2(ctx, canvas, keysDown);

let level = 1;
let main = () => {
  if (level == 1) {
    level1.main();
    if (level1.skeletonBoss.healthBar < 0) {
      level = 2;
    }
  } else {
    level2.main();
  }
  requestAnimationFrame(main);
};

main();
