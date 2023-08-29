"use client";
import { useWizard } from "@/context/wizard.context";
import { useFormContext, Controller } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}
export default function NameForm() {
  const { nextStep, backStep } = useWizard();
  const { register, watch } = useFormContext<UserForm>(); 
  const watchName = watch("name")?.length > 5;

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold mb-2 text-white">
          Nome
        </label>

        <input
          type="text"
          id="name"
          placeholder="Ex.: João Silva"
          className="text-sm"
          {...register("name")}
        />
      </div>
      <div className="flex justify-between mt-2">
      <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded  p-2"
          disabled={!watchName}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
