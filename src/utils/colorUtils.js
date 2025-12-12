import {green, orange, red} from "@mui/material/colors";

const getTextColor = (bgHex) => {
  const hex = bgHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 186 ? '#000' : '#fff'; // светлый фон → черный текст, тёмный фон → белый
};

const colorsPriority = {
  High: red[500],
  Normal: orange[500],
  Low: green[500],
};

export { getTextColor, colorsPriority };