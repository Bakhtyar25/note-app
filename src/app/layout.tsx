import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/layout/header";
import CookieProvider from "@/providers/cookie-provider";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/custom/error-boundary";

const raleway = Raleway({
  subsets: ["cyrillic"],
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
      <head>
        <link rel="icon" href="/image/logo.svg" sizes="any" />
      </head>
      <body className={`${raleway.className} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </body>
    </html>
  );
}


