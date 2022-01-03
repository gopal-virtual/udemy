const commonColors = {
  teal: "#70DBD4",
  blue: "#5297FF",
  "red-pink": "linear-gradient(180deg, #FF4A4A 0%, #FC5CFF 100%)",
  "blue-teal": "linear-gradient(180deg, #5297FF 0%, #70DBD4 100%)",
  "teal-blue-horizontal": "linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)",
  "orange-yellow": "linear-gradient(180deg, #FFA26D 0%, #FFD771 100%)",
};
const Theme = {
  colors: {
    dark: {
      ...commonColors,
      "grey-1": "#7A7A7A",
      "grey-2": "#FDF9F3",
      foreground: "#FDF9F3",
      background: "#242424",
    },
    light: {
      ...commonColors,
      "grey-1": "#E2E2E2",
      "grey-2": "#7A7A7A",
      foreground: "#000000",
      background: "#FDF9F3",
    },
  },
};

export default Theme;
