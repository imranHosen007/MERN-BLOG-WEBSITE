let month = [
  "jan",
  "feb",
  "march",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const getTimeFunction = timeStamp => {
  let date = new Date(timeStamp);
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
};
