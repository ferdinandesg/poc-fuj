"use client";
import { useWizard } from "@/context/wizard.context";
import { useFormContext } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}
export default function PhoneForm() {
  const { backStep, create } = useWizard();
  const {
    register,
    formState: { errors },
  } = useFormContext<UserForm>(); // retrieve all hook methods
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
          disabled={!!errors.phone}
          onClick={create}
        >
          Finalizar
        </button>
      </div>
    </>
  );
}
