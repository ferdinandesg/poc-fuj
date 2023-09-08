"use client";
import { useState } from "react";
import { BasicModal } from "@/components/modal/basic.modal";
import { useModal } from "@/context/modal.context";
import Link from "next/link";
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

export default function StoreHome() {
  const router = useRouter();
  const { showModal, setShowModal } = useModal();
  const [document, setDocument] = useState<string>("");
  const authMutation = trpc.users.auth.useMutation();
  const auth = async () => {
    try {
      const user = await authMutation.mutateAsync({
        document: document.replace(/[^0-9]/g, ""),
      });
      setShowModal(false);
      router.push(`/store/complete/${user.document}`);
    } catch (error: any) {
      if (typeof error?.message === "string") toast(error.message);
      else toast("Usuário nao encontrado");
    }
  };
  return (
    <main className="sm:flex-row min-h-screen min-w-screen flex flex-col-reverse">
      {showModal && (
        <BasicModal title="Fazer Login" onConfirm={() => auth()}>
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
        </BasicModal>
      )}
      <header className="w-full bg-gray-400 p-2 hidden items-center justify-center h-screen sm:flex">
        <span className="text-white">Main page</span>
      </header>
      <aside className="w-full bg-gray-600 flex-col flex p-2 h-screen">
        <div className={"h-1/3 flex items-center justify-center"}>
          <h2 className="text-white">Escolha a opção desejada:</h2>
        </div>
        <div className="flex flex-col justify-around">
          <div className="flex flex-col gap-2">

            <Link className="p-2 transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
              href={"/store/reader/pay"}
            >
              Pagar
            </Link>


            <Link
              href={"/store/reader/register"}
              className="p-2 transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
            >
              Cadastro Rápido
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="p-2 text-left transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
            >
              Finalizar cadastro
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}
