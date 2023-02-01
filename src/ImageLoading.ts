import AnimatedText from "./AnimatedText";

export const loadImage = (imageUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e: any) => {
      reject(e);
    };
  });
};

export const loadingScreen = (ctx: CanvasRenderingContext2D, percent: number) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = "100px Comic Sans MS";
  ctx.fillStyle = "#DEF";
  ctx.fillText(`Loading... ${percent}%`, 20, ctx.canvas.height / 2 - 50, ctx.canvas.width);
  ctx.fillStyle = "#823";
  ctx.fillRect(30, ctx.canvas.height / 2 - 25, ctx.canvas.width - 60, 50);
  ctx.fillStyle = "#f45";
  ctx.fillRect(30, ctx.canvas.height / 2 - 25, (ctx.canvas.width - 60) * (percent / 100), 50);
};

export const blackScreen = (ctx: CanvasRenderingContext2D, text: string, time: number) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "100px Comic Sans MS";
  ctx.fillText(text, 600, 500);

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, time * 1000);
  });
}

export class CharacterTalkBubble {
  animatedTexts: AnimatedText[];
  animNum: number = 0;

  constructor(public image: CanvasImageSource, public characterName: string, lines: string[], public bottom: boolean) {
    this.animatedTexts = [];

    for (let i = 0; i < lines.length; i++) {
      this.animatedTexts.push(
        new AnimatedText([80, (this.bottom ? 700 : 150) + (i * 50), 950], lines[i], 3, 50, { color: "#fff", strokeColor: "#aaa" }, 3)
      );
    }

    this.animatedTexts.push(
      new AnimatedText([80, (this.bottom ? 900 : 350)], "Press Space To Continue", 5, 30, { color: "#2f8", strokeColor: "#1B5" }, 1)
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#333";
    ctx.fillRect(20, (this.bottom ? 600 : 50), ctx.canvas.width - 40, ctx.canvas.height - 620);

    this.animatedTexts[0].draw(ctx);
    for (let i = 0; i < this.animatedTexts.length - 1; i++) {
      if (this.animatedTexts[i].isDone) this.animatedTexts[i + 1].draw(ctx);
    }

    if (!this.animatedTexts[this.animatedTexts.length - 1].isDone) {
      if (this.animNum >= 3) this.animNum = 0;
      ctx.drawImage(this.image, 2 + (16 * Math.floor(this.animNum)), 2, 12, 8, 1100, this.bottom ? 640 : 90, 450, 300);
      this.animNum += 0.1;
    } else {
      ctx.drawImage(this.image, 2, 2, 12, 8, 1100, this.bottom ? 640 : 90, 450, 300);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText(this.characterName, 1000, this.bottom ? 965 : 415);
  }
}
