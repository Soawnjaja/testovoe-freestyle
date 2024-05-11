import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Тестовое Фристайл",
  description: "Поиск в инпуте по городам и регионам",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
