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

let main = () => {
  let now = Date.now();
  let delta = now - then;
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  hero.draw();
  skeletonBoss.draw();
  interface.drawBossHealthBar();
  interface.drawHeroHeart(hero.lives);
  hero.update(keysDown);
  skeletonBoss.update();
  checkForCollision(hero.bullet, skeletonBoss);

  then = now;
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
