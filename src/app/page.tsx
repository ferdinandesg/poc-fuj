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

export default function Home() {
  const { showModal, setShowModal } = useModal()
  const [document, setDocument] = useState<string>("")
  const authMutation = trpc.users.auth.useMutation()
  const src = "";
  const auth = async () => {
    try {
      await authMutation.mutateAsync({ document: document.replace(/[^0-9]/g, "") })
      toast("Usuário autenticado")
      setShowModal(false)
    } catch (error: any) {
      if (error!.message) toast(error.message)
      console.log({ error });

    }
  }
  return (
    <main className="sm:flex-row min-h-screen min-w-screen flex flex-col-reverse">
      {showModal && <BasicModal title="Fazer Login" onConfirm={() => auth()}>
        <div className="flex flex-col">
          <label htmlFor="document" className="font-semibold mb-2">
            CPF
          </label>
          <input
            placeholder="Ex.: 000-000-000-00"
            type="text"
            id="document"
            value={document}
            onChange={(e) => setDocument(maskCPF(e.target.value))}
          />
        </div>
      </BasicModal>}
      <header className="w-full bg-lime-500 p-2 flex items-center justify-center sm:h-screen h-[50vh]">
        <span className="text-white">Main page</span>
      </header>
      <aside className="w-full bg-lime-100 flex-col flex p-2 sm:h-screen h-[50vh]">
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
    </main >
  );
}
