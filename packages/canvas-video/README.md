# `@kjojs/canvas-video`

- snapshots of the canvas can be exported as video to fit the frame

## Getting Started

```js
import CanvasVideo from '@kjojs/canvas-video';

const TEN_MINUTES = 1000 * 60 * 10
const canvasVideo = new CanvasVideo({
  canvas: {
    width: 200,
    height: 200,
  },
  video: {
    totalTime: TEN_MINUTES,
    frameRate: 60,
  },
  render: (ctx, {
    frameOrder, // starting from 1
    time, // milliseconds
    percent, // if totalTime is empty, it's always zero
  }) => {
    const rotateAngle = (frameOrder * Math.PI) / 3;

    ctx.clearRect(0, 0, 200, 200);
    ctx.rotate(rotateAngle);
    ctx.fillStyle = '#000000';
    ctx.fiilRect(10, 10, 180, 180);
  },
});

canvasVideo.insertUnder(document.body);
```
