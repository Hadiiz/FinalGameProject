let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let hero = new Hero(ctx);

let main = () => {
  hero.draw();
  requestAnimationFrame(main);
};

main();
