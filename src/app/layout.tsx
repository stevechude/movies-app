import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "../provider/query-provider";
import Layout from "@/components/layout/Layout";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movies App",
  description: "Built by Steve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
