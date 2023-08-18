"use client";
import { useWizard } from "@/context/wizard.context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  document: string;
}
const maskCEP = (cep: string) => {
  if (!cep) return "";

  return cep
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};
export default function Address() {
  const { nextStep, backStep } = useWizard();
  const { register, setValue, watch } = useFormContext<UserForm>(); // retrieve all hook methods

  const watchCep = watch("address");
  const isCepValid = /^\d{5}-\d{3}$/.test(watchCep);
  useEffect(() => {
    setValue("address", maskCEP(watchCep));
  }, [watchCep]);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="address" className="font-semibold mb-2">
          CEP
        </label>
        <input
          placeholder="Ex.: 12345-000"
          type="text"
          id="address"
          {...register("address")}
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
          disabled={!isCepValid}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
