export function checkTouchSupport() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;

  return 'ontouchstart' in win || (win.DocumentTouch && document instanceof win.DocumentTouch);
}
