type Animation = "idle" | "run" | "attack" | "jump";

const animationToNumber = (anim: Animation) => {
  return (
    (anim == "idle") ? 0 :
      (anim == "run") ? 1 :
        (anim == "attack") ? 2 :
          (anim == "jump") ? 3 : 4)
};

export default class Sprite {
  animation: Animation;
  animationFrame: number = 0;

  constructor(public x: number, public y: number,
    public w: number, public h: number,
    public img: CanvasImageSource,
    public automaticImageSource: boolean = true
  ) {
    this.animation = "idle";
  }

  setAnimation(animation: Animation) {
    this.animation = animation;
    this.animationFrame = 0;
  }

  getAnimationFrame() {
    if (this.animationFrame > 3) this.animationFrame = 0;

    return [this.animationFrame * 16,
    animationToNumber(this.animation) * 16, 16, 16];
  }

  draw(ctx: CanvasRenderingContext2D, sourceParams?: number[]) {
    if (this.automaticImageSource) {
      const sourceLoc = this.getAnimationFrame(),
      params = [sourceLoc[0], sourceLoc[1], sourceLoc[2], sourceLoc[3],
        this.x, this.y, this.w, this.h];
      params.map(Math.round);

      ctx.drawImage(this.img, ...params);
    } else if (sourceParams) {
      ctx.drawImage(this.img, ...sourceParams, this.x, this.y, this.w, this.h);
    }
  }
}
