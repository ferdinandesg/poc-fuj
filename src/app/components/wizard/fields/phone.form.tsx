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

const maskPhone = (phone: string) => {
  if (!phone) return "";

  // .replace(/(\d{5})(\d)/, "$1-$2")
  // .replace(/(-\d{3})\d+?$/, "$1");

  return phone
    .replace(/[\D]/g, "")
    .replace(/(\d{2})/, "($1) ")
    .replace(/(\d{5})/, "$1-")
    .replace(/(\d{4})\d+?$/, "$1");
};
export default function PhoneForm() {
  const { backStep, create } = useWizard();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<UserForm>(); // retrieve all hook methods
  const watchCep = watch("phone");
  const isPhoneValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(watchCep);
  useEffect(() => {
    setValue("phone", maskPhone(watchCep));
  }, [watchCep]);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="phone" className="font-semibold mb-2">
          Telefone
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone", { required: true })}
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
          disabled={!isPhoneValid}
          onClick={create}
        >
          Finalizar
        </button>
      </div>
    </>
  );
}
