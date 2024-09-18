/** @type {import('tailwindcss').Config} */
import { screens as _screens } from "tailwindcss/defaultTheme";

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      custom: ["AvenirBold", "AvenirRegular"],
      roboto: ["Roboto", "sans-serif"],
    },
    colors: {
      bgColor: "#ffffff",
      bgColor2: "#F2F2F2",
      prmColor: "#1B5430",
      color: "#0d0d0f",
      color1: "#1b1c1e40",
      color2: "#FBFBFB",
      color3: "#062411",
      color4: "#F3900F",
      color5: "#E18D06",
    },
  },
  screens: {
    lit: { max: "300px" },
    ..._screens,
  },
};
export const plugins = [];
