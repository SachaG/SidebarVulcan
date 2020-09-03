const enFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

// see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
export const formatMoney = (n, locale = "en") => {
  if (typeof n === "undefined" || n === null) return "";
  return enFormatter.format(n);
};

export const stripHash = (color) => color && color.replace("#", "");

export const addHash = (color) => {
  if (color && color.slice(0, 1) !== "#") {
    return `#${color}`;
  } else {
    return color;
  }
};