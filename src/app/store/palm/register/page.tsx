"use client";
import { WizardContextProvider } from "@/context/wizard.context";
import { useForm, FormProvider } from "react-hook-form";
import PhoneConfirm from "@/components/wizard/forms/phone.confirm";
import StoreWizard from "@/components/wizard/store";
import StorePalmWizard from "@/components/wizard/store/register/store.palm";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
}
export default function StoreRegister() {
  const methods = useForm<UserForm>();

  return (
    <FormProvider {...methods}>
      <WizardContextProvider>
        <main className="flex min-h-screen items-center justify-between bg-gray-400">
          <StorePalmWizard />
        </main>
      </WizardContextProvider>
    </FormProvider>
  );
}
