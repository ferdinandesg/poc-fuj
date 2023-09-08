"use client";
import ConfirmationFormRegister from "@/forms/register/confirmation.form";
import PayWizard from "@/components/wizard/pay";
import { WizardContextProvider } from "@/context/wizard.context";
import { FormProvider, useForm } from "react-hook-form";

interface PaymentForm {
  amount: string;
}

export default function Pay() {
  const methods = useForm<PaymentForm>();

  return (
    <FormProvider {...methods}>
      <WizardContextProvider>
        <main className="flex min-h-screen items-center justify-between bg-gray-400">
          <PayWizard />
        </main>
      </WizardContextProvider>
    </FormProvider>
  );
}
