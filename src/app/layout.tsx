import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} items-center min-h-screen bg-gradient-to-br from-sky-50 to-gray-200`}>
      <ToastContainer />
        <NavMenu />
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
