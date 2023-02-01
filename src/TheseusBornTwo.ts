import Sprite from "./Sprite";
import { blackScreen, CharacterTalkBubble, loadImage, loadingScreen } from "./ImageLoading";

import troezenUrl from "./troezen.png";
import aegusUrl from "./aegus.png";
import aethraUrl from "./aethra.png";
import boulderUrl from "./boulder.png";

export default async function theseusBornTwo(ctx: CanvasRenderingContext2D) {
  const troezenImage = await loadImage(troezenUrl);
  loadingScreen(ctx, 25);
  const aegusImage = await loadImage(aegusUrl);
  loadingScreen(ctx, 50);
  const aethraImage = await loadImage(aethraUrl);
  loadingScreen(ctx, 75);
  const boulderImage = await loadImage(boulderUrl);

  const aegeus = new Sprite(50, 450, 500, 500, aegusImage);
  const aethra = new Sprite(1050, 450, 500, 500, aethraImage);
  const boulder = new Sprite(600, 500, 250, 250, boulderImage, false);

  const dialogue = [
    new CharacterTalkBubble(aegusImage, "Aegeus", ["If our son can lift that boulder, he may", "claim the throne of Athens."], false),
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
      boulder.draw(ctx, [0, 0, 16, 16]);

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
        await blackScreen(ctx, "Years later...", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spacePress);
  });
}
