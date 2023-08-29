"use client";
import NumericPad from "@/components/numericPad";
import { useWizard } from "@/context/wizard.context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  addressId: string;
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
  const { register, setValue, watch } = useFormContext<UserForm>(); 

  const watchCep = watch("addressId");
  const isCepValid = /^\d{5}-\d{3}$/.test(watchCep);
  const formattedCep = watchCep?.replace(/[^0-9]/g, "")

  const setAddressValue = (phone: string) => {
    setValue("addressId", maskCEP(phone));
  }

  useEffect(() => {
    setAddressValue(watchCep)
  }, [watchCep]);
  return (
    <>
      <div className="flex flex-col mb-5">
        <label htmlFor="address" className="font-semibold mb-2 text-white">
          CEP
        </label>
        <input
          placeholder="Ex.: 12345-000"
          type="text"
          id="address"
          {...register("addressId")}
        />
      </div>
      <NumericPad className="w-1/2 mx-auto" value={formattedCep} onChangeNumeric={(x) => setAddressValue(x)} />
      <div className="flex justify-between mt-2">
        <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded  p-2"
          disabled={!isCepValid}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
