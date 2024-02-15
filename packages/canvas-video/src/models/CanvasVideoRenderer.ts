import { CanvasVideoPlayerState } from './CanvasVideoPlayerState';

export interface CanvasVideoRenderer {
  (ctx: CanvasRenderingContext2D, state: CanvasVideoPlayerState): void;
}
