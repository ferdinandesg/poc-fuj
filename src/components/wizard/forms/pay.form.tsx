"use client";
import NumericPad from "@/components/numericPad";
import { useWizard } from "@/context/wizard.context";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

function maskAmount(amount: string) {
  if (!amount) amount = "0";
  const num = parseFloat(amount);
  const formatted = (num / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted;
}
export default function PaymentForm() {
  const [amount, setAmount] = useState<string>("");
  const { nextStep } = useWizard();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("amount", maskAmount(amount));
  }, [amount]);

  return (
    <div className="bg-gray-600 p-4 flex justify-center">
      <div className="w-1/2">
        <h2 className="text-xl text-white">Digite o valor a ser pago</h2>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-white font-semibold text-xl">R$</span>
          <input
            value={maskAmount(amount)}
            readOnly={true}
            className="bg-transparent border-b border-b-white text-white"
            type="text"
          />
        </div>
        <NumericPad value={amount} onChangeNumeric={(x) => setAmount(x)} />
        <div className="col-span-3 text-center">
          <button
            onClick={nextStep}
            disabled={!amount.length}
            className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded-full p-2 w-full mt-2"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
