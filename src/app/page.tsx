"use client";
import { BasicModal } from "@/components/modal/basic.modal";
import { useModal } from "@/context/modal.context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

const maskCPF = (doc: string) => {
    if (!doc) return "";
    return doc
        .replace(/[\D]/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

export default function UserHome() {
    const router = useRouter()
    return (
        <main className="sm:flex-row min-h-screen min-w-screen flex flex-col-reverse">
            <header className="w-full bg-lime-500 p-2 flex items-center justify-center sm:h-screen h-[50vh]">
                <span className="text-white">Main page</span>
            </header>
            <aside className="w-full bg-lime-100 flex-col flex p-2 sm:h-screen h-[50vh]">
                <div
                    className={"h-1/3 flex items-center justify-center"}
                >
                    Imagem
                </div>
                <div className="flex flex-col justify-around">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="user"
                            className="p-2 bg-primary bg-orange-300 rounded hover:bg-orange-400 text-gray-800"
                        >
                            Painel usuário
                        </Link>
                        <Link
                            className="p-2 bg-primary bg-orange-300 rounded hover:bg-orange-400 text-gray-800"
                            href={"/store"}
                        >
                            Painel Lojista
                        </Link>
                    </div>

                </div>
            </aside>
        </main >
    );
}
