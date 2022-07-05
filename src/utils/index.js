export const convertNumberToLetter = (num) => {
  var s = "",
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s || undefined;
};

export const createRange = (min, max) => {
  var range = [];
  for (let i = min; i <= max; i++) {
    range.push(i);
  }
  return range;
};
