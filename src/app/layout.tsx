
import "./globals.css";
import { Roboto, Pacifico } from "next/font/google";
import { Toaster } from "sonner";
import TopBar from "@/components/TopBar";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${roboto.className} ${pacifico.variable}`}>
      <body>
        <TopBar/>
        {children}
        <Toaster position="top-center" richColors /> {/* Toaster global */}
      </body>
    </html>
  );
}
