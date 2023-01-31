import Sprite from "./Sprite";
import { blackScreen, CharacterTalkBubble, loadImage, loadingScreen } from "./ImageLoading";

import troezenUrl from "./troezen.png";
import theseusUrl from "./theseus.png";
import aethraUrl from "./aethra.png";
import boulderUrl from "./boulder.png";

export default async function theseusYoungAdult(ctx: CanvasRenderingContext2D) {
  const troezenImage = await loadImage(troezenUrl);
  loadingScreen(ctx, 25);
  const theseusImage = await loadImage(theseusUrl);
  loadingScreen(ctx, 50);
  const aethraImage = await loadImage(aethraUrl);
  loadingScreen(ctx, 75);
  const boulderImage = await loadImage(boulderUrl);
  loadingScreen(ctx, 100);

  const theseus = new Sprite(50, 450, 500, 500, theseusImage);
  const aethra = new Sprite(1050, 450, 500, 500, aethraImage);
  const boulder = new Sprite(350, 650, 250, 250, boulderImage, false);

  const dialogue = [
    new CharacterTalkBubble(aethraImage, ["Theseus, what are you doing?"], false),
    new CharacterTalkBubble(theseusImage, ["I can lift the boulder mom!"], false),
    new CharacterTalkBubble(aethraImage, ["Thats amazing!"], false),
    new CharacterTalkBubble(aethraImage, ["You can now claim the throne to Athens!"], false)
  ];
  let dialogueIdx = 0;

  return new Promise((resolve, _reject) => {
    let animationFrame = requestAnimationFrame(drawLoop);

    let updateAnimation = setInterval(() => {
      theseus.animationFrame += 1;
      aethra.animationFrame += 1;
    }, 500);

    function drawLoop() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(troezenImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      theseus.draw(ctx);
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
        await blackScreen(ctx, "Minotaur", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spacePress);
  });
}
