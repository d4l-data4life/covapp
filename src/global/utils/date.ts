export const getToday = (): number => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  let dateString = `${year}-${zeroPadded(month)}-${zeroPadded(day)}`;
  let zeroedDate = new Date(dateString);
  return zeroedDate.getTime();
};

export const getStorageString = (date: Date): string => {
  return `${date.getFullYear()}.${zeroPadded(date.getMonth() + 1)}.${zeroPadded(date.getDate())}`;
};

const zeroPadded = (n: number) => {
  return `0${n}`.slice(-2);
};
