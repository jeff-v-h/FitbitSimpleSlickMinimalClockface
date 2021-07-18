// Add zero in front of numbers < 10
export const zeroPad = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};
