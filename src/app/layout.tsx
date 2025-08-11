import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/layout/header";
import CookieProvider from "@/providers/cookie-provider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note App",
  description: "Organize your notes by priority and status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.variable} antialiased`}>
        <CookieProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Toaster />
            <div className="bg-background">{children}</div>
          </ThemeProvider>
        </CookieProvider>
      </body>
    </html>
  );
}


