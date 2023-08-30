"use client";
import { useWizard } from "@/context/wizard.context";
import Stepper from "../stepper";
import { twMerge } from "tailwind-merge";
import { ReactNode, useEffect, useState } from "react";
import { Fingerprint, Contact2, CreditCard } from "lucide-react";
import Link from "next/link";
import SuccessForm from "./forms/success.form";
import BioFormRegister from "./forms/register/bio.form";
import { trpc } from "@/utils/trpc";
import { useFormContext } from "react-hook-form";
import CardFormComplete from "./forms/complete/card.form.complete";
interface Step {
  step: number;
  label: string;
  icon: ReactNode;
}
function ActiveStepFormComponent({ document }: CompleteWizardProps) {
  const { step } = useWizard();
  switch (step) {
    case 1:
      return (
        <Stepper.Step>
          <CardFormComplete />
        </Stepper.Step>
      );
    case 2:
      return (
        <Stepper.Step>
          <BioFormRegister />
        </Stepper.Step>
      );
    case 3:
      return (
        <Stepper.Step>
          <SuccessForm />
        </Stepper.Step>
      );
    default:
      return null;
  }
}

type CompleteWizardProps = {
  document: string;
};
export default function CompleteWizard({ document }: CompleteWizardProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const {
    setValue,
    formState: { touchedFields },
  } = useFormContext();
  const userByDocumentMutation = trpc.users.getByDocument.useMutation();
  const { step } = useWizard();
  const STEPS: Step[] = [
    { step: 1, label: "Cartão", icon: <CreditCard /> },
    { step: 2, label: "Biometria", icon: <Fingerprint /> },
    { step: 3, label: "Confirmação", icon: <Contact2 /> },
  ];
  useEffect(() => {
    userByDocumentMutation
      .mutateAsync({ document })
      .then((user) => {
        setValue("document", user.document);
        setValue("name", user.name);
        setValue("phone", user.phone);
        setValue("addressId", user.addressId);
      })
      .finally(() => setLoading(false));
  }, []);
  if (isLoading)
    return <div className="bg-gray-600 text-white">Loading...</div>;
  return (
    <Stepper.Root className="md:w-3/4 w-full h-screen mx-auto bg-gray-600 p-4">
      <div className="w-full mb-4">
        <Link
          href="/store"
          className="text-xs underline cursor-pointer hover:text-gray-200 text-white"
        >
          Ir para a página principal
        </Link>
      </div>
      <ul className="flex justify-center gap-2 mx-auto mb-4 ">
        {STEPS.map((x) => (
          <li
            key={`step-${x.label}`}
            className={twMerge(
              "md:p-4 p-2 md:w-24 w-16 rounded flex flex-col items-center border-4 gap-2",
              x.step > step
                ? "bg-gray-400 border-transparent"
                : "bg-gray-600 border-white"
            )}
          >
            <span className="font-semibold text-white">{x.icon}</span>
            <span className="text-white text-sm hidden md:block">
              {x.label}
            </span>
          </li>
        ))}
      </ul>
      <ActiveStepFormComponent document={document} />
    </Stepper.Root>
  );
}
