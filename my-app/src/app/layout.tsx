import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Script from "next/script";
import { AppProvider } from "@/components/providers/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FindMyCareer - Career Guidance for Students",
  description: "Find your ideal career path with our psychological test and comprehensive guidance for Grade 9-12 students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            // Handle theme based on user preference or localStorage
            (function() {
              function getTheme() {
                if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                  return localStorage.getItem('theme');
                }
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  return 'dark';
                }
                return 'light';
              }
              
              const theme = getTheme();
              const root = document.documentElement;
              
              if (theme === 'dark') {
                root.classList.add('dark');
              } else {
                root.classList.remove('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <footer className="py-6 border-t">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} FindMyCareer. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
