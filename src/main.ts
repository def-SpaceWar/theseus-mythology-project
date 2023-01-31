import './style.css'

import backstory from "./Backstory";
import theseusBorn from "./TheseusBorn";
import theseusYoungAdult from './TheseusYoungAdult';
import minotaurBackstory from './MinotaurBackstory';
import theseusVolunteer from './TheseusVolunteer';
import preBossFight from './PreBossFight';
import bossFight from './BossFight';
import ending from './Ending';

window.onload = async () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    alert("Canvas 2D is not supported. Exit Code: 1");
    throw new Error("Canvas 2D Not Supported!");
  }

  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  document.getElementById("app")!.appendChild(canvas);

  await backstory(ctx);
  await theseusBorn(ctx);
  await theseusYoungAdult(ctx);
  await minotaurBackstory(ctx);
  await theseusVolunteer(ctx);
  await preBossFight(ctx);
  await bossFight(ctx);
  await ending(ctx);
};
