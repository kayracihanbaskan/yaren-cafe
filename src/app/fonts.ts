import localFont from "next/font/local";
export const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/lora/files/lora-latin-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/lora/files/lora-latin-ext-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/lora/files/lora-latin-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource-variable/lora/files/lora-latin-ext-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-lora",
  display: "swap",
  preload: false,
});
export const sans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});
