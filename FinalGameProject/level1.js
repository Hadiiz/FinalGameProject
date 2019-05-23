let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hero = new Hero(0, canvas.height - 200, ctx);
let skeletonBoss = new SkeletonBoss(canvas.width - 500, 200, ctx, hero);
let interface = new Interface(
  skeletonBoss.healBar,
  canvas.width / 2 - 350,
  60,
  ctx
);

let deleted = [];

var keysDown = {};
var backgroundmenu = new Image();
backgroundmenu.src = "./img/MenuBackground.jpg";
var exitBackground = new Image();
exitBackground.src = "./img/exit.png";
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

var then;

let background = new Image();
background.src = "./img/background.jpg";
background.onload = () => {
  then = Date.now();
  main();
};
var chosen = false;
var exit = false;
var gameOver = new Image();
gameOver.src = "./gameover.jpg";
var GameOver = false;
let main = () => {
  if (GameOver == false) {
    if (chosen == false) {
      ctx.drawImage(backgroundmenu, 0, 0, canvas.width, canvas.height);
      //taking input from the mouse
      addEventListener("click", options, false);
      //assigning option of user
      function options(ev) {
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        console.log("x:" + x);
        console.log("y:" + y);
        //starting game
        if (x >= 56 && x < 454 && y >= 105 && y < 267) {
          chosen = true;
          removeEventListener("click", options, false);
        } else if (x >= 77 && x < 458 && y >= 495 && y < 596) {
          chosen = true;
          exit = true;
        }
      }
    }
    if (chosen == true && exit == false) {
      let now = Date.now();
      let delta = now - then;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      hero.draw();
      skeletonBoss.draw();
      interface.drawBossHealthBar();
      interface.drawHeroHeart(hero.lives);
      hero.update(keysDown, delta / 1000);
      skeletonBoss.update();
      checkForCollision(hero.bullet, skeletonBoss);
      // console.log(skeletonBoss.healthBar);
      then = now;
    }
    if (exit == true) {
      removeEventListener("click", options, false);
      ctx.drawImage(exitBackground, 0, 0, canvas.width, canvas.height);
    }
    if (hero.lives == 0) {
      GameOver = true;
    }
  }
  if (GameOver == true) {
    ctx.drawImage(gameOver, 0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(main);
};

checkForCollision = (bullet, boss) => {
  let bossX1 = boss.x + 130;
  let bossX2 = bossX1 + 270;
  let bossY1 = boss.y + 150;
  let bossY2 = bossY1 + 180;

  for (let i = 0; i < bullet.length; i++) {
    if (
      bullet[i].x2 > bossX1 &&
      bullet[i].x2 < bossX2 &&
      bullet[i].y2 < bossY2 &&
      bullet[i].y2 > bossY1
    ) {
      hero.deleted.push(bullet[i]);
      boss.healthBar -= 5;
      interface.updateBossHealth();
      console.log(boss.healthBar);
    }
  }
};
