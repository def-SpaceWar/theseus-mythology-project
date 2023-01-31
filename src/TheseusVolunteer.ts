import Sprite from "./Sprite";
import { blackScreen, CharacterTalkBubble, loadImage, loadingScreen } from "./ImageLoading";

import athensUrl from "./athens.png";
import theseusUrl from "./theseus.png";
import aegeusUrl from "./aegus.png";

export default async function theseusVolunteer(ctx: CanvasRenderingContext2D) {
  const athensImage = await loadImage(athensUrl);
  loadingScreen(ctx, 33);
  const theseusImage = await loadImage(theseusUrl);
  loadingScreen(ctx, 67);
  const aegeusImage = await loadImage(aegeusUrl);
  loadingScreen(ctx, 100);

  const theseus = new Sprite(50, 450, 500, 500, theseusImage);
  const aegeus = new Sprite(1050, 450, 500, 500, aegeusImage);

  const dialogue = [
    new CharacterTalkBubble(aegeusImage, ["Theseus, please do not go. I care for you", "a lot. I do not wish for you to die."], false),
    new CharacterTalkBubble(theseusImage, ["I can do it. I will stop the Minotaur once", "and for all!"], false),
    new CharacterTalkBubble(theseusImage, ["Too many innocent Athenians are being", "sacrificed. I must put an end to this."], false),
    new CharacterTalkBubble(theseusImage, ["I will be one of the 7 young men you send."], false)
  ];
  let dialogueIdx = 0;

  return new Promise((resolve, _reject) => {
    let animationFrame = requestAnimationFrame(drawLoop);

    let updateAnimation = setInterval(() => {
      theseus.animationFrame += 1;
      aegeus.animationFrame += 1;
    }, 500);

    function drawLoop() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(athensImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      theseus.draw(ctx);
      aegeus.draw(ctx);

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
        await blackScreen(ctx, "Crete", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spacePress);
  });
}
