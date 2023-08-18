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
  const { nextStep } = useWizard();
  const { register, watch } = useFormContext<UserForm>(); // retrieve all hook methods
  const watchName = watch("name")?.length > 5;

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold mb-2">
          Nome
        </label>

        <input
          type="text"
          id="name"
          placeholder="Ex.: João Silva"
          {...register("name")}
        />
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="disabled:bg-orange-400 bg-orange-600 rounded text-white p-2"
          disabled={!watchName}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
