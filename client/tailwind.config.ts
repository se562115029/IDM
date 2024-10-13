/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

/** light : dark mode */
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

/** Generate Light mode or Dark mode */
/** Colors (Tailwind) : [blue:{  '50': '#eff6ff',
    '100': '#dbeafe',....}] */
/** mapping = *shadeMapping*, the object of shade color for light : dark  */
/** invest : boolean for define *Is it a dark mode? * */
/** Result :  blue: {
    '50': '#1e3a8a',
    '100': '#1e40af',
    '200': '#1d4ed8',
    '300': '#2563eb',
    '400': '#3b82f6',
    '500': '#60a5fa',
    '600': '#93c5fd',
    '700': '#bfdbfe',
    '800': '#dbeafe',
    '900': '#eff6ff'
  } */
const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};
  /** baseColors : the specified colors of application such as blue, gray, etc. */
  baseColors.forEach((color) => {
    /** build them object theme { blue :{}} */
    theme[color] = {};

    /** Looping shade color */
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key;
      /** Color application = color code */
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
};

/** declare mode object */

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

/** automatic create themes */
const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  /** set dark mode class for any tailwind config , allow to using dark mode*/
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  /** create themes */
  plugins: [createThemes(themes)],
};
export default config;
