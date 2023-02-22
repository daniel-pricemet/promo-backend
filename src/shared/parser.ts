export default {
  tryStringToNumber: (str: string): number | undefined => {
    if (!str) return undefined;

    const num = Number(str);
    if (isNaN(num)) return Number(str.replace(',', '.'));
    return num;
  },
  dateToISO: (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  },
};
