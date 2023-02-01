import Sprite from "./Sprite";
import { blackScreen, loadImage, loadingScreen } from "./ImageLoading";
import AnimatedText from "./AnimatedText";

import labyrinthUrl from "./labyrinth.png";
import theseusUrl from "./theseus.png";
import minotaurUrl from "./minotaur.png";

type CoordContainer = {
  x: number,
  y: number,
}

const squaredDistance = (o1: CoordContainer, o2: CoordContainer) => {
  return (o1.x - o2.x) ^ 2 + (o1.y - o2.y) ^ 2;
};

export default async function bossFight(ctx: CanvasRenderingContext2D) {
  const creteImage = await loadImage(labyrinthUrl);
  loadingScreen(ctx, 33);
  const theseusImage = await loadImage(theseusUrl);
  loadingScreen(ctx, 67);
  const minotaurImage = await loadImage(minotaurUrl);
  loadingScreen(ctx, 100);

  const theseus = new Sprite(50, 450, 500, 500, theseusImage);
  const minotaur = new Sprite(950, 550, 500, 500, minotaurImage);

  const spaceToAttack = new AnimatedText([100, 160, ctx.canvas.width], "Space To Attack", 0.5, 60, { color: "#444", strokeColor: "#333" }, 3);
  const rightToMove = new AnimatedText([100, 240, ctx.canvas.width], "Right Arrow To Move", 0.65, 60, { color: "#2F8", strokeColor: "#1B5" }, 3);

  let movePlayer = false;

  return new Promise((resolve, _reject) => {
    let animationFrame = requestAnimationFrame(drawLoop);

    let updateAnimation = setInterval(() => {
      theseus.animationFrame += 1;
      minotaur.animationFrame += 1;

      if (squaredDistance(theseus, minotaur) < 50) {
        spaceToAttack.color = "#f00";
        spaceToAttack.fontSize = 80;
        return;
      }
      if (movePlayer) theseus.x += 50;
    }, 1000);

    function drawLoop() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(creteImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      theseus.draw(ctx);

      minotaur.draw(ctx);

      spaceToAttack.draw(ctx);
      rightToMove.draw(ctx);

      animationFrame = requestAnimationFrame(drawLoop);
    }

    async function spacePress(e: KeyboardEvent) {
      if (e.key == " ") {
        if (squaredDistance(theseus, minotaur) > 50) return;
        theseus.setAnimation("attack");

        document.removeEventListener("keydown", spacePress);
        document.removeEventListener("keyup", unSpacePress);

        await new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve(null);
          }, 3000);
        });

        cancelAnimationFrame(animationFrame);
        clearInterval(updateAnimation);
        await blackScreen(ctx, "CENSORED", 1);
        await blackScreen(ctx, "No Violence", 3);
        resolve(null);
      }

      if (e.key == "ArrowRight" && theseus.animation != "run") {
        theseus.setAnimation("run");
        movePlayer = true;
      }
    }

    function unSpacePress(e: KeyboardEvent) {
      if (e.key == "ArrowRight") {
        movePlayer = false;
        theseus.setAnimation("idle");
      }
    }

    document.addEventListener("keydown", spacePress);
    document.addEventListener("keyup", unSpacePress);
  });
}
