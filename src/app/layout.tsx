import "../globals.css";
import Providers from "@/Providers/Provider";
import { Red_Hat_Text } from "next/font/google";

const redHatText = Red_Hat_Text({
  subsets: ["latin"], // kerakli subset
  weight: ["400", "500", "700"], // kerakli og‘irliklar
  display: "swap",
});
export const metadata = {
  title: "Trips App",
  description: "Manage your WB trips easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={redHatText.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
