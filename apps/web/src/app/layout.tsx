import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactLenis } from "@/utils/lenis";
import { Montserrat, Poppins } from "next/font/google";
import { cn } from "@/lib/cn";
import QueryProvider from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";

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
    <html lang='en'>
      <ReactLenis
        options={{
          duration: 1.1,
          lerp: 0.1,
          wheelMultiplier: 1.5,
          touchMultiplier: 2,
        }}
        root
      >
        <body className={cn(montserrat.variable, poppins.variable, "antialiased")}>
          <QueryProvider>
            {children}
            <ToastProvider />
          </QueryProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
