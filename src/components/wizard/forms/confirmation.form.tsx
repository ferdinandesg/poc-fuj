"use client";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";

interface UserForm {
  name: string;
  addressId: string;
  phone: string;
  document: string;
}

const renderLabel = (key: string) => {
  switch (key) {
    case "name":
      return "Nome completo";
    case "document":
      return "CPF";
    case "addressId":
      return "Endereço";
    case "phone":
      return "Telefone";
    case "amount":
      return "Valor";
    default:
      return "Campo";
  }
};

export default function ConfirmationForm() {
  const { nextStep, backStep } = useWizard();
  const { getValues } = useFormContext<UserForm>();
  const paymentMutation = trpc.payments.payment.useMutation();
  const payment = async () => {
    try {
      const result = await paymentMutation.mutateAsync({
        document: getValues("document"),
      });
      nextStep();
    } catch (error) {
      if (typeof error === "string") toast(error);
      console.log(error);
    }
  };
  return (
    <>
      <div className="md:flex-row gap-2 flex flex-col flex-wrap">
        {Object.entries(getValues()).map(([key, value]) => (
          <div key={`form-${key}`} className="flex flex-col flex-grow">
            <label className="text-sm text-white font-semibold">
              {renderLabel(key)}
            </label>
            <span className="p-1 text-gray-100">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5 gap-2">
        <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2 w-1/2"
          onClick={backStep}
        >
          Voltar
        </button>

        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded p-2 w-1/2"
          onClick={payment}
        >
          <span className="relative flex w-1/2 justify-center mx-auto">
            Realizar pagamento
          </span>
        </button>
      </div>
    </>
  );
}
