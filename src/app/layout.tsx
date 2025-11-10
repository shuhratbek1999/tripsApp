import "../globals.css";
import Providers from "@/Providers/Provider";
import { Red_Hat_Text } from "next/font/google";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-red-hat-text",
  display: "swap",
});

export const metadata = {
  title: "Courier UI",
  description: "Manage your WB trips easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={redHatText.variable}>
      <body className={redHatText.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
