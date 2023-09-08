"use client";
import { BasicModal } from "@/components/modal/basic.modal";
import { useModal } from "@/context/modal.context";
import Link from "next/link";
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
            <header className="w-full bg-gray-400 p-2 flex items-center justify-center sm:h-screen h-[50vh]">
                <span className="text-white">Main page</span>
            </header>
            <aside className="w-full bg-gray-600 flex-col flex p-2 sm:h-screen h-[50vh]">
                <div className={"h-1/3 flex items-center justify-center"}>
                    <h2 className="text-white">Escolha a opção desejada:</h2>
                </div>
                <div className="flex flex-col justify-around">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="user"
                            className="p-2 text-left transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
                        >
                            Painel usuário
                        </Link>
                        <Link
                            className="p-2 text-left transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
                            href={"/store/reader"}
                        >
                            Painel Lojista (Fingerprint)
                        </Link><Link
                            className="p-2 text-left transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
                            href={"/store/palm"}
                        >
                            Painel Lojista (Palm)
                        </Link>
                    </div>

                </div>
            </aside>
        </main >
    );
}
