import { CNumber } from './lib/complex';
import { getComplexNumber, getCoords } from './lib/coords';
import { doesDiverge } from './lib/iterate';
import { debounce } from './lib/util';

let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 400;
let MAX_ITER = 1000;
let C = { x: -0.04, y: -0.12 };

const heightInput = document.querySelector<HTMLInputElement>('#height');
const widthInput = document.querySelector<HTMLInputElement>('#width');
const cImageValueInput =
  document.querySelector<HTMLInputElement>('#cImagValue');
const cRealValueInput = document.querySelector<HTMLInputElement>('#cRealValue');
const maxIterInput = document.querySelector<HTMLInputElement>('#maxIter');
const inputs = [
  cImageValueInput,
  cRealValueInput,
  maxIterInput,
  heightInput,
  widthInput
];

const canvasEl = document.querySelector<HTMLCanvasElement>('#canvas');
const ctx = canvasEl.getContext('2d');

const newImageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

function draw(C: CNumber, MAX_ITER: number) {
  for (let i = 0; i <= newImageData.width * newImageData.height; i++) {
    let j = i * 4;
    const { row, col } = getCoords(j, CANVAS_WIDTH);
    const cNum = getComplexNumber(row, col, CANVAS_WIDTH, CANVAS_HEIGHT);

    // iterate, and if greater -> diverges
    if (!doesDiverge(cNum, C, MAX_ITER)) {
      newImageData.data[j] = 0;
      newImageData.data[j + 1] = 0;
      newImageData.data[j + 2] = 0;
      newImageData.data[j + 3] = 255;
    } else {
      newImageData.data[j] = 255;
      newImageData.data[j + 1] = 255;
      newImageData.data[j + 2] = 255;
      newImageData.data[j + 3] = 255;
    }
  }

  ctx.clearRect(0, 0, newImageData.width, newImageData.height);
  ctx.putImageData(newImageData, 0, 0);
}

draw(C, MAX_ITER);

inputs.forEach(inputEl => {
  inputEl.addEventListener(
    'click',
    debounce(() => {
      CANVAS_WIDTH = widthInput.valueAsNumber;
      CANVAS_HEIGHT = heightInput.valueAsNumber;

      canvasEl.setAttribute('height', String(CANVAS_HEIGHT));
      canvasEl.setAttribute('width', String(CANVAS_WIDTH));

      C = {
        x: cRealValueInput.valueAsNumber,
        y: cImageValueInput.valueAsNumber
      };

      MAX_ITER = maxIterInput.valueAsNumber;

      draw(C, MAX_ITER);
    }, 500)
  );
});
