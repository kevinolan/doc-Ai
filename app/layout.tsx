import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carely | Outpatient care made simple",
  description: "Manage appointments and stay connected with your care team.",
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
