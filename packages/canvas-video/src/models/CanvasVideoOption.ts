import { CanvasVideoRenderer } from './CanvasVideoRenderer';

export interface CanvasVideoVideoOption {
  totalTime?: number;
  frameRate?: number;
  className?: string;
  inlineStyles?: Record<string, string | number | boolean>;
}

export interface CanvasVideoOption extends CanvasVideoVideoOption {
  width?: number;
  height?: number;
  ratio?: number;
  render: CanvasVideoRenderer;
}
