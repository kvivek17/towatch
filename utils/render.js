import throttle from 'lodash/throttle';

export const render = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.font = "16px Arial";
  ctx.textBaseline = "top";

  const playaudio = throttle(() => {
    const audio = new Audio('/audio.mp3');
    audio.play();
  }, 2000);

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const isperson = prediction.className === "person";

    ctx.strokeStyle = isperson ? "red" : "blue";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = isperson ? "rgba(255,0,0,0.2)" : "rgba(0,0,255,0.2)";
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = isperson ? "red" : "blue";
    const textwidth = ctx.measureText(prediction.className).width;
    const textheight = parseInt("20px", 10);

    ctx.fillRect(x, y, textwidth + 4, textheight + 4);

    ctx.fillStyle = '#000000';
    ctx.fillText(prediction.className, x, y);

    if (isperson) {
      playaudio(); // ✅ Now works, no error
    }
  });
};
