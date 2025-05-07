export const formatNum = (
  input: number | string,
  requireDecimal: boolean = true,
  decimalPlaces: number = 2,
  localize: boolean = false
): string => {
  if (input === undefined || input === null || isNaN(Number(input))) {
    return "0";
  }

  const number = Number(input);

  const formattedNumber = requireDecimal
    ? number.toFixed(decimalPlaces).replace(/\.?0+$/, "")
    : Math.floor(number).toString();

  return localize
    ? formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : formattedNumber;
};
