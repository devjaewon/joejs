export interface CanvasVideoPlayerState {
  sequence: number; // starting from 0
  time: number; // milliseconds unit
  percent: number; // if totalTime is empty, it's always zero
  isPlaying: boolean;
}
