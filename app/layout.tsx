import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Zap } from "lucide-react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VidMetric - YouTube Channel Analytics",
  description: "Analyze competitor YouTube channels and discover which videos are crushing it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <nav className="border-b border-border/50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">VidMetric</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Powered by YouTube API
              </div>
            </div>
          </div>
        </nav>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t border-border/50 glass mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-sm text-muted-foreground">
              © 2025 VidMetric. YouTube channel analytics for competitive insights.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
