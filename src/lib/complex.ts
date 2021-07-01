export type CNumber = { x: number, y: number };

export const real = (a: CNumber) => a.x;
export const imag = (a: CNumber) => a.y;

export function cConj(a: CNumber): CNumber {
  return {
    x: a.x,
    y: -a.y,
  };
}

export function cMod(a: CNumber): number {
  return Math.sqrt(a.x**2 + a.y**2);
}

export function cAdd(a: CNumber, b: CNumber): CNumber {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function cSub(a: CNumber, b: CNumber): CNumber {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

export function cMult(a: CNumber, b: CNumber): CNumber {
  return {
    x: a.x * b.x - a.y * b.y,
    y: a.y * b.x + b.y * a.x,
  };
}

export function div(a: CNumber, b: { x: number, y: 0 }): CNumber {
  return {
    x: a.x / b.x,
    y: a.y / b.x,
  };
}

export function cDiv(a: CNumber, b: CNumber): CNumber {
  const den = b.x**2 + b.y**2;
  return {
    x: (a.x * b.x + a.y * b.y) / den,
    y: (a.y * b.x - b.y * a.x) / den,
  }
}
