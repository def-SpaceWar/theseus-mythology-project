import Sprite from "./Sprite";
import { blackScreen, CharacterTalkBubble, loadImage, loadingScreen } from "./ImageLoading";

import creteUrl from "./crete.png";
import theseusUrl from "./theseus.png";
import ariadneUrl from "./ariadne.png";

export default async function preBossFight(ctx: CanvasRenderingContext2D) {
  const creteImage = await loadImage(creteUrl);
  loadingScreen(ctx, 33);
  const theseusImage = await loadImage(theseusUrl);
  loadingScreen(ctx, 67);
  const ariadneImage = await loadImage(ariadneUrl);
  loadingScreen(ctx, 100);

  const theseus = new Sprite(50, 450, 500, 500, theseusImage);
  const ariadne = new Sprite(1050, 50, 500, 500, ariadneImage);

  const dialogue = [
    new CharacterTalkBubble(ariadneImage, ["Take this sword so you can slay the ", "minotaur, and take this spool of string", "so you don't get lost in the Labyrinth."], true),
    new CharacterTalkBubble(theseusImage, ["Why are you helping me?"], false),
    new CharacterTalkBubble(ariadneImage, ["Because I pity you."], true),
    new CharacterTalkBubble(new Image(), ["Note: she actually falls in love with", "Theseus, but nothing ever happens", "between them."], false)
  ];
  let dialogueIdx = 0;

  return new Promise((resolve, _reject) => {
    let animationFrame = requestAnimationFrame(drawLoop);

    let updateAnimation = setInterval(() => {
      theseus.animationFrame += 1;
      ariadne.animationFrame += 1;
    }, 500);

    function drawLoop() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(creteImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      theseus.draw(ctx);
      ariadne.draw(ctx);

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
        await blackScreen(ctx, "Labyrinth", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spacePress);
  });
}
