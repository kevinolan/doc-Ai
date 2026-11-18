import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediCare AI | Hospital management",
  description: "Manage appointments and support hospital care operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
