export function convertRectToIDomRect(rect) {
  const width = rect.width;
  const height = rect.height;
  const left = rect.left ?? rect.x;
  const top = rect.top ?? rect.y;
  const right = left + width;
  const bottom = top + height;

  return {
    top,
    right,
    bottom,
    left,
    width,
    height,
  };
}
