import type { Metadata } from "next";
import { Dela_Gothic_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// !--------------- Google Font ------------->
const dela = Dela_Gothic_One({
  weight: ["400"],
  variable: "--font-dela-gothic",
  subsets: ["latin"],
});

// !--------------- Local Font ------------->
// !--------------- cc: Dafont ------------->
const gilroy = localFont({
  src: [
    {
      path: "/fonts/Gilroy-Thin.ttf",
      weight: "100",
    },
    {
      path: "/fonts/Gilroy-UltraLight.ttf",
      weight: "200",
    },
    {
      path: "/fonts/Gilroy-Light.ttf",
      weight: "300",
    },
    {
      path: "/fonts/Gilroy-Regular.ttf",
      weight: "400",
    },
    {
      path: "/fonts/Gilroy-Medium.ttf",
      weight: "500",
    },
    {
      path: "/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "/fonts/Gilroy-Bold.ttf",
      weight: "700",
    },
    {
      path: "/fonts/Gilroy-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "/fonts/Gilroy-Black.ttf",
      weight: "900",
    },
    {
      path: "/fonts/Gilroy-Heavy.ttf",
      weight: "950",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "Globetrotters",
  description:
    "Effortlessly plan your next trip with AI. Explore destinations, craft personalized itineraries, and enjoy seamless travel planning from start to finish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gilroy.variable} ${dela.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
