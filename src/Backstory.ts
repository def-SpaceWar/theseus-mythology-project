import AnimatedText from "./AnimatedText";
import { blackScreen } from "./ImageLoading";

export default async function backstory(ctx: CanvasRenderingContext2D) {
  const readSpeed = 2.5;

  const line1 = new AnimatedText([30, 30, ctx.canvas.width - 60], "King Aegeus of Athens, wanted a child, and consulted", readSpeed),
    line2 = new AnimatedText([30, 90, ctx.canvas.width - 60], "an oracle on the way to Troezen. The oracle told him:", readSpeed),
    line3 = new AnimatedText([30, 150, ctx.canvas.width - 60], "\"if he had a child, he would die of sorrow one day.\"", readSpeed),
    line4 = new AnimatedText([30, 210, ctx.canvas.width - 60], "And at Troezen, he would soon have a child with the", readSpeed),
    line5 = new AnimatedText([30, 270, ctx.canvas.width - 60], "daughter of King Pittheus of Troezen, Aethra.", readSpeed);

  const spaceCaption = new AnimatedText(
    [ctx.canvas.width / 2 - 200, 450], "Press Space To Continue", readSpeed * 4 / 3, 30,
    { color: "#2f8", strokeColor: "#1B5" }, 1
  );

  let animationLoop = requestAnimationFrame(drawLoop);

  function drawLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    line1.draw(ctx);
    if (line1.isDone) line2.draw(ctx);
    if (line2.isDone) line3.draw(ctx);
    if (line3.isDone) line4.draw(ctx);
    if (line4.isDone) line5.draw(ctx);
    if (line5.isDone) spaceCaption.draw(ctx);

    animationLoop = requestAnimationFrame(drawLoop);
  }

  return new Promise((resolve, _reject) => {
    async function spaceHit(e: KeyboardEvent) {
      if (e.key == " ") {
        document.removeEventListener("keypress", spaceHit);
        cancelAnimationFrame(animationLoop);
        await blackScreen(ctx, "Troezen", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spaceHit)
  });
}
