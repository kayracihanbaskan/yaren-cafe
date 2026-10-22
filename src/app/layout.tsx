import { serif, sans } from "./fonts";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
