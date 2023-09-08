"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "@/context/socket.context";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
    return <SocketProvider channel="reader">
        {children}
    </SocketProvider>

}

export default RootLayout;
