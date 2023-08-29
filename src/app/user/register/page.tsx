"use client";
import { WizardContextProvider } from "@/context/wizard.context";
import UserWizard from "@/components/wizard/user";
import { useForm, FormProvider } from "react-hook-form";
import PhoneConfirm from "@/components/wizard/forms/phone.confirm";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}
export default function Register() {
  const methods = useForm<UserForm>();

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
