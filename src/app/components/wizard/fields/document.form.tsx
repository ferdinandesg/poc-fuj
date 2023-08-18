"use client";
import { useWizard } from "@/context/wizard.context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}

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

export default function DocumentForm() {
  const { nextStep, backStep } = useWizard();
  const { register, watch, setValue } = useFormContext<UserForm>(); // retrieve all hook methods
  const watchDocument = watch("document");
  const isValidDocument = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(watchDocument);
  useEffect(() => {
    setValue("document", maskCPF(watchDocument));
  }, [watchDocument]);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="document" className="font-semibold mb-2">
          CPF
        </label>
        <input
          placeholder="Ex.: 000-000-000-00"
          type="text"
          id="document"
          {...register("document")}
        />
      </div>
      <div className="flex justify-between mt-2">
        <button
          className="hover:bg-red-500 hover:text-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-orange-400 bg-orange-600 rounded text-white p-2"
          disabled={!isValidDocument}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
