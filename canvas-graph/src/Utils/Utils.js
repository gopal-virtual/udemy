export const lerp = (norm, min, max) => {
  return (max - min) * norm + min;
};

export const norm = (val, min, max) => {
  return (val - min) / (max - min);
};

export const map = (val, minA, maxA, minB, maxB, round = true) => {
  const n = norm(val, minA, maxA);
  const l = lerp(n, minB, maxB);
  return round ? Math.round(l) : l;
};