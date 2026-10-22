import localFont from "next/font/local";
export const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-ext-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-ext-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-serif",
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
  variable: "--font-sans",
  display: "swap",
  preload: false,
});
