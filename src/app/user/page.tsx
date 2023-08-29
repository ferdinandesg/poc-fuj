"use client";
import { BasicModal } from "@/components/modal/basic.modal";
import { useModal } from "@/context/modal.context";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

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
  const router = useRouter();
  const { showModal, setShowModal } = useModal();
  const [document, setDocument] = useState<string>("");
  const authMutation = trpc.users.auth.useMutation();
  const src = "";
  const finishRegister = async () => {
    const formattedDocument = document.replace(/[^0-9]/g, "");
    try {
      const user = await authMutation.mutateAsync({
        document: formattedDocument,
      });
      toast("Usuário autenticado");
      setShowModal(false);
      if (user.document && !user.name) {
        router.push(`user/complete/${formattedDocument}`);
        return;
      }
      if (user.name) return;
      if (!user.promotion?.sms?.isVerified) toast("Conta não verificada");
    } catch (error: any) {
      if (error!.message) toast(error.message);
      console.log({ error });
    }
  };

  return (
    <main className="sm:flex-row min-h-screen min-w-screen flex flex-col-reverse">
      {authMutation.isLoading && (
        <div className="absolute w-screen h-screen bg-black bg-opacity-25 flex items-center justify-center z-50">
          {" "}
          <Loader
            size={96}
            color="white"
            fill="white"
            className="animate-spin"
          />{" "}
        </div>
      )}
      {showModal && (
        <BasicModal title="Fazer Login" onConfirm={() => finishRegister()}>
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
        <div
          className={"h-1/3 flex items-center justify-center"}
          style={{ backgroundImage: src }}
        >
          <h2 className="text-white">Escolha a opção desejada:</h2>

        </div>
        <div className="flex flex-col h-full justify-around">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 text-left transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
            >
              Entrar
            </button>
            <Link
              className="p-2 transition hover:bg-white bg-gray-600 border-white border hover:text-gray-600 text-white rounded "
              href={"/user/register"}
            >
              Cadastrar
            </Link>
          </div>

          <span className="text-sm mx-auto text-white">
            Já começou um cadastro pela loja?{" "}
            <button
              onClick={() => setShowModal(true)}
              className="border-b border-orange-400  hover:border-orange-700"
            >
              Finalize seu cadastro aqui
            </button>
          </span>
        </div>
      </aside>
    </main>
  );
}
