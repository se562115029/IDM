import type { Metadata } from "next";
import "./globals.css";
import DashboardWrapper from "./dashboarWrapper";

export const metadata: Metadata = {
  title: "PTASTOCK",
  description: "Inventory System Showcase",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /** pass a Children to DashboardWrapper component */
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
