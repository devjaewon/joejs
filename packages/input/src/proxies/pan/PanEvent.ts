export enum PanEventType {
  start = 'start',
  move = 'move',
  end = 'end',
}

export interface PanEvent {
  type: PanEventType;
  // coordinates relative to the target (not including scroll offset)
  clientX: number;
  clientY: number;
  // coordinates relative to the target (including scroll offset)
  pageX: number;
  pageY: number;
  // coordinates relative to the screen (not including scroll offset)
  screenX: number;
  screenY: number;
  // delta by prev event
  deltaX: number;
  deltaY: number;
  // delta by start event
  tdeltaX: number;
  tdeltaY: number;
  // instantaneous velocity
  velocityX: number;
  velocityY: number;
  // timestamp(ms) on created
  time: number;
}
