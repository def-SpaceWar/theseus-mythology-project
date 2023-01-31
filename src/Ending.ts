import AnimatedText from "./AnimatedText";

export default async function ending(ctx: CanvasRenderingContext2D) {
  const readSpeed = 2.5;

  const lines: string[] = [
    "To sum it all up, the minotaur was killed in his sleep",
    "and Theseus was a hero to all Athenians."
  ];

  const animLines: AnimatedText[] = [];

  for (let i = 0; i < lines.length; i++) {
    animLines.push(new AnimatedText([30, 30 + (i * 60), ctx.canvas.width - 60], lines[i], readSpeed));
  }

  let animationLoop = requestAnimationFrame(drawLoop);

  function drawLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    animLines[0].draw(ctx);
    for (let i = 0; i < animLines.length-1; i++) {
      if (animLines[i].isDone) animLines[i+1].draw(ctx);
    }

    animationLoop = requestAnimationFrame(drawLoop);
  }

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      cancelAnimationFrame(animationLoop);
      resolve(null);
    }, 25000);
  });
}
