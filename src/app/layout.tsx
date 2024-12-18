import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { dela, gilroy } from "@/lib/fonts";

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
      <body className={`${gilroy.variable} ${dela.variable} font-gilroy antialiased`}>
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
