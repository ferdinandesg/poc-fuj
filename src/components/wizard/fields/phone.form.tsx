"use client";
import NumericPad from "@/components/numericPad";
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
  const { backStep, nextStep } = useWizard();
  const {
    register,
    formState: { touchedFields },
    watch,
    setValue,
  } = useFormContext<UserForm>();
  const watchPhone = watch("phone");
  const isPhoneValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(watchPhone);
  const formattedPhone = watchPhone?.replace(/[^0-9]/g, "")
  const setPhoneValue = (phone: string) => {
    setValue("phone", maskPhone(phone));
  }

  useEffect(() => {
    setPhoneValue(watchPhone)
  }, [watchPhone]);
  return (
    <>
      <div className="flex flex-col mb-5">
        <label htmlFor="phone" className="font-semibold mb-2 text-white">
          Telefone
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone", { required: true })}
        />
        {touchedFields.phone && !isPhoneValid && <span className="text-xs mt-1 text-red-600">Campo inválido </span>}
      </div>
      <NumericPad className="w-1/2 mx-auto" value={formattedPhone} onChangeNumeric={(x) => setPhoneValue(x)} />
      <div className="flex justify-between mt-2">
        <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded  p-2"
          disabled={!isPhoneValid}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
