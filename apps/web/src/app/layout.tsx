import type { Metadata } from "next";
import "../styles/globals.css";
import { Montserrat, Poppins } from "next/font/google";
import { cn } from "@/lib/cn";
import QueryProvider from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import ThemeColorManager from "@/components/global/ThemeColorManager";
import SettingsSidebar from "@/components/global/SettingsSidebar";
import ShortcutManager from "@/components/global/ShortcutManager";
import NoiseBackground from "@/components/global/NoiseBackground";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sadid - Let's Build Something Amazing Together!",
  description: "Let's code! 😊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className="dark">
        <body className={cn(montserrat.variable, poppins.variable, "antialiased")}>
          <QueryProvider>
            <ThemeColorManager />
            <SettingsSidebar />
            <ShortcutManager />
            <TopProgressBar />
            <Navbar />
             <NoiseBackground>
              {children}
              <Footer />
             </NoiseBackground>
            <ToastProvider />
          </QueryProvider>
        </body>
    </html>
  );
}
