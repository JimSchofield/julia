import {cAdd, cMod, cMult, CNumber} from "./complex";

export function iterate(c: CNumber, C: CNumber) {
  // c => iterate value
  // C => complex c from f(x) = z^2 + C
  return cAdd(cMult(c, c), C);
}

export function doesDiverge(c: CNumber, C: CNumber, MAX_ITER: number) {
  const MAX_VAL = (1 + Math.sqrt(1 + 4 * cMod(C))) / 2;
  let iterateVal = c;
  let index = 0;

  while (index <= MAX_ITER) {
    iterateVal = iterate(iterateVal, C);

    if (cMod(iterateVal) > MAX_VAL) {
      return true;
    }

    index ++;
  }

  return false;
}
