"use client";
import { trpc } from "@/utils/trpc";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalStyles } from "@/theme/GlobalStyle";
import { ToastContainer } from "react-toastify";
import { ModalContextProvider } from "@/context/modal.context";

const inter = Inter({ subsets: ["latin"] });



function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalContextProvider>
          {children}
          <ToastContainer />
        </ModalContextProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
