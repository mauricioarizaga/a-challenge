export const convertYYYYMMDDToDate = (dateStr: string) => {
  const year = +dateStr.substring(0, 4);
  const month = +dateStr.substring(4, 6);
  const day = +dateStr.substring(6, 8);

  return new Date(year, month - 1, day);
};
