"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function Home() {
  const src = "";
  return (
    <main className="sm:flex-row min-h-screen flex flex-col">
      <header className="w-1/2 bg-lime-500 p-2 flex items-center justify-center">
        <span className="text-white">Main page</span>
      </header>
      <aside className="w-1/2 bg-lime-100 flex-col flex p-2">
        <div
          className={"h-1/3 flex items-center justify-center"}
          style={{ backgroundImage: src }}
        >
          Imagem
        </div>
        <div className="flex flex-col h-full justify-around">
          <div className="flex flex-col gap-2">
            <Link
              href=""
              className="p-2 bg-primary bg-orange-300 rounded hover:bg-orange-400 text-gray-800"
            >
              Entrar
            </Link>
            <Link
              className="p-2 bg-primary bg-orange-300 rounded hover:bg-orange-400 text-gray-800"
              href={"/register"}
            >
              Cadastrar
            </Link>
          </div>

          <span className="text-sm mx-auto">
            Já começou um cadastro pela loja?{" "}
            <Link
              href=""
              className="border-b border-orange-400  hover:border-orange-700"
            >
              Finalize seu cadastro aqui
            </Link>
          </span>
        </div>
      </aside>
    </main>
  );
}
