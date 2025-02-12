let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audio = new Audio("audio/mainMusic.mp3");

let backgroundmenu = new Image();
backgroundmenu.src = "img/MenuBackground.jpg";
let exitBackground = new Image();
exitBackground.src = "img/exit.png";

let chosen = false;
let exit = false;

let gameOverAudio = new Audio("audio/gameOver.mp3");

let level1Victory = new Image();
level1Victory.src = "img/victory1.png";
let showCounter = 100;
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
audio.volume = 0.4;

var endgame = false;
let main = () => {
  //CHeCKING If player chose his option
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
      if (x >= 28 && x < 248 && y >= 81 && y < 263) {
        chosen = true;
      }
      //ending game
      else if (x >= 48 && x < 256 && y >= 526 && y < 690) {
        endgame = true;
      }
    }
  }
  if (chosen == true && endgame == false) {
    if (level2.GameOver != true && level1.GameOver != true) {
      audio.play();
    } else {
      gameOverAudio.play();
      audio.pause();
    }
    if (level == 1) {
      level1.main();
      if (level1.skeletonBoss.healthBar < 0) {
        if (showCounter > 0) {
          ctx.drawImage(level1Victory, 0, 0, canvas.width, canvas.height);
          showCounter--;
        } else {
          level = 2;
        }
      }
    } else {
      level1.stop();
      level2.main();
    }
  }
  if (endgame == true) {
    ctx.drawImage(exitBackground, 0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(main);
};

main();
