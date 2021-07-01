import {getComplexNumber, getCoords} from './lib/coords';
import {doesDiverge} from './lib/iterate';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const MAX_ITER = 1000;
const C = { x: -.04, y: -.12 }

const canvasEl = document.querySelector<HTMLCanvasElement>('#canvas');
const ctx = canvasEl.getContext('2d');

const newImageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);


function draw() {
  for (let i = 0; i <= newImageData.width * newImageData.height; i++) {
    let j = i * 4;
    const {row, col} = getCoords(j, CANVAS_WIDTH);
    const cNum = getComplexNumber(row, col);

    // iterate, and if greater -> diverges
    if (!doesDiverge(cNum, C, MAX_ITER)) {
      newImageData.data[j] = 0;
      newImageData.data[j+1] = 0;
      newImageData.data[j+2] = 0;
      newImageData.data[j+3] = 255;
    } else {
      newImageData.data[j] = 255;
      newImageData.data[j+1] = 255;
      newImageData.data[j+2] = 255;
      newImageData.data[j+3] = 255;
    }
  }

  ctx.clearRect(0,0,newImageData.width, newImageData.height);
  ctx.putImageData(newImageData, 0, 0);
}

draw();
