import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { Analytics } from "@vercel/analytics/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { dela, gilroy } from "@/lib/fonts";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Suspense } from "react";

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
      <body
        className={`${gilroy.variable} ${dela.variable} font-gilroy antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
