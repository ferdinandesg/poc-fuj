"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "@/context/socket.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

function RootLayout({ children }: { children: React.ReactNode }) {
    return <SocketProvider>
        {children}
    </SocketProvider>

}

export default RootLayout;
