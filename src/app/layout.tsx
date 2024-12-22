import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { Analytics } from "@vercel/analytics/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { dela, gilroy } from "@/lib/fonts";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Suspense } from "react";
import Footer from "@/components/sections/footer";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Globetrotters",
  description:
    "Effortlessly plan your next trip with AI. Explore destinations, craft personalized itineraries, and enjoy seamless travel planning from start to finish.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gilroy.variable} ${dela.variable} bg-mist-blue dark:bg-midnight-blue font-gilroy antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
