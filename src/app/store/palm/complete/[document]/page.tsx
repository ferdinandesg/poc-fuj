"use client";
import { WizardContextProvider } from "@/context/wizard.context";
import { useForm, FormProvider } from "react-hook-form";
import PhoneConfirm from "@/components/wizard/forms/phone.confirm";
import StoreWizard from "@/components/wizard/store";
import CompleteWizard from "@/components/wizard/complete";
import SuccessForm from "@/components/wizard/forms/success.form";
import CompletePalmWizard from "@/components/wizard/store/register/complete.palm";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}

interface CompleteRegisterParams {
  params: {
    document: string;
  };
}

export default function Complete({ params }: CompleteRegisterParams) {
  const methods = useForm<UserForm>();

  return (
    <FormProvider {...methods}>
      <WizardContextProvider>
        <main className="flex min-h-screen items-center justify-between bg-gray-400">
          {!methods.formState.isSubmitted ? (
            <CompletePalmWizard document={params.document} />
          ) : (
            <SuccessForm />
          )}
        </main>
      </WizardContextProvider>
    </FormProvider>
  );
}
