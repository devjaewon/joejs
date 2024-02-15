export interface CanvasVideoRendererContext {
  frameOrder: number; // starting from 1
  time: number; // milliseconds unit
  percent: number; // if totalTime is empty, it's always zero
}

export interface CanvasVideoRenderer {
  (ctx: CanvasRenderingContext2D, rendererContext: CanvasVideoRendererContext): void;
}
