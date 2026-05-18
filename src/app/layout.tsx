import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full of Shit — Startup Reality Engine",
  description:
    "Brutal startup analyzer. Detects vague ideas, crowded categories, weak pain, missing buyers, and fake progress — before you waste months.",
  metadataBase: new URL("https://fullofshit.vercel.app"),
  openGraph: {
    title: "Full of Shit — Startup Reality Engine",
    description:
      "A spam filter for startup thinking. Run a reality check: BS score, viability, redundancy, and the next validation move.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full of Shit — Startup Reality Engine",
    description:
      "Stop wasting your brain on ideas that do not need to exist. Run a reality check.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-amber-300/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
