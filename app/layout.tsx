import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediFlow AI | Hospital Scheduling",
  description: "An intelligent hospital appointment scheduling and booking platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
