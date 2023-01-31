import Sprite from "./Sprite";
import { blackScreen, CharacterTalkBubble, loadImage, loadingScreen } from "./ImageLoading";
import theseusBornTwo from "./TheseusBornTwo";

import troezenUrl from "./troezen.png";
import aegusUrl from "./aegus.png";
import aethraUrl from "./aethra.png";

export default async function theseusBorn(ctx: CanvasRenderingContext2D) {
  const troezenImage = await loadImage(troezenUrl);
  loadingScreen(ctx, 33);
  const aegusImage = await loadImage(aegusUrl);
  loadingScreen(ctx, 67);
  const aethraImage = await loadImage(aethraUrl);
  loadingScreen(ctx, 100);

  const aegeus = new Sprite(50, 450, 500, 500, aegusImage);
  const aethra = new Sprite(1050, 450, 500, 500, aethraImage);

  const dialogue = [
    new CharacterTalkBubble(aegusImage, ["I want to have a son, because I need an",
      "heir to the throne of Athens."], false),
    new CharacterTalkBubble(aethraImage, ["Count me in!"], false),
  ];
  let dialogueIdx = 0;

  return new Promise((resolve, _reject) => {
    let animationFrame = requestAnimationFrame(drawLoop);

    let updateAnimation = setInterval(() => {
      aegeus.animationFrame += 1;
      aethra.animationFrame += 1;
    }, 500);

    function drawLoop() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(troezenImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      aegeus.draw(ctx);
      aethra.draw(ctx);

      dialogue[dialogueIdx].draw(ctx);

      animationFrame = requestAnimationFrame(drawLoop);
    }

    async function spacePress(e: KeyboardEvent) {
      if (e.key != " ") return;

      if (dialogueIdx < dialogue.length - 1) dialogueIdx++;
      else {
        cancelAnimationFrame(animationFrame);
        clearInterval(updateAnimation);
        document.removeEventListener("keypress", spacePress);
        await blackScreen(ctx, "A day later...", 3);
        await theseusBornTwo(ctx);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spacePress);
  });
}
