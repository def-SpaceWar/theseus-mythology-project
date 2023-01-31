import AnimatedText from "./AnimatedText";
import { blackScreen } from "./ImageLoading";

export default async function minotaurBackstory(ctx: CanvasRenderingContext2D) {
  const readSpeed = 2.5;

  const lines: string[] = [
    "The Minotaur is a child of Minos' wife and a bull. It is",
    "a very vicious creature and is trapped in the Labyrinth",
    "in Crete. Aegeus, King of Athens, and Minos, King of",
    "Crete, had a war, because Aegeus killed Minos' son.",
    "So, after winning, Minos forced Aegeus to send 7",
    "young men and 7 young women yearly to be sacrificed",
    "to the minotaur. On the way to Athens, Theseus",
    "already proved himself heroic, killing many bad guys.",
    "But killing the minotaur is what Theseus is most",
    "famous for."
  ];

  const animLines: AnimatedText[] = [];

  for (let i = 0; i < lines.length; i++) {
    animLines.push(new AnimatedText([30, 30 + (i * 60), ctx.canvas.width - 60], lines[i], readSpeed));
  }

  const spaceCaption = new AnimatedText(
    [ctx.canvas.width / 2 - 200, 850], "Press Space To Continue", readSpeed * 4 / 3, 30,
    { color: "#2f8", strokeColor: "#1B5" }, 1
  );

  let animationLoop = requestAnimationFrame(drawLoop);

  function drawLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    animLines[0].draw(ctx);
    for (let i = 0; i < animLines.length-1; i++) {
      if (animLines[i].isDone) animLines[i+1].draw(ctx);
    }
    if (animLines[animLines.length-1].isDone) spaceCaption.draw(ctx);

    animationLoop = requestAnimationFrame(drawLoop);
  }

  return new Promise((resolve, _reject) => {
    async function spaceHit(e: KeyboardEvent) {
      if (e.key == " ") {
        document.removeEventListener("keypress", spaceHit);
        cancelAnimationFrame(animationLoop);
        await blackScreen(ctx, "Athens", 3);
        resolve(null);
      }
    }

    document.addEventListener("keypress", spaceHit)
  });
}
