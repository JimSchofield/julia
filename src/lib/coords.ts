export function getCoords(index: number, width: number) {
  let pixelIndex = index / 4;

  const col = pixelIndex % width;
  const row = Math.floor(pixelIndex / width);

  return { row, col };
}

export function getComplexNumber(row: number, col: number) {
  return {
    x: col * 6 / 599 - 3,
    y: row * -4 / 399 + 2,
  }
}

