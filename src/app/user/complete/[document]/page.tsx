"use client";
import PhoneConfirm from "@/components/wizard/forms/phone.confirm";
import UserWizard from "@/components/wizard/user";
import { WizardContextProvider } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";

interface UserForm {
  name: string;
  addressId: string;
  phone: string;
  document: string;
}
interface FinishRegisterParams {
  params: { document: string };
}

export default function FinishUserRegister({ params }: FinishRegisterParams) {
  const methods = useForm<UserForm>({
    defaultValues: { document: params.document },
  });

  return (
    <FormProvider {...methods}>
      <WizardContextProvider>
        <main className="flex min-h-screen items-center justify-between bg-gray-400">
          {!methods.formState.isSubmitted ? <UserWizard /> : <PhoneConfirm />}
        </main>
      </WizardContextProvider>
    </FormProvider>
  );
}
