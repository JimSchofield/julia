export function getCoords(index: number, width: number) {
  let pixelIndex = index / 4;

  const col = pixelIndex % width;
  const row = Math.floor(pixelIndex / width);

  return { row, col };
}

export function getComplexNumber(
  row: number,
  col: number,
  CANVAS_WIDTH: number,
  CANVAS_HEIGHT: number
) {
  return {
    x: (col * 6) / (CANVAS_WIDTH - 1) - 3,
    y: (row * -4) / (CANVAS_HEIGHT - 1) + 2,
  };
}
