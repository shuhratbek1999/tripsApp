import "../globals.css";
import Providers from "@/Providers/Provider";

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
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
