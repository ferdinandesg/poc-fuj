"use client";
import { useWizard } from "@/context/wizard.context";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { Contact2, CreditCard, Hand, User } from "lucide-react";
import Link from "next/link";
import DocumentForm from "../../fields/document.form";
import PalmFormRegister from "../../forms/register/palm.step";
import CardForm from "../card.form";
import ConfirmationFormRegister from "./confirmation.form";
import Stepper from "@/components/stepper";
interface Step {
  step: number;
  label: string;
  icon: ReactNode;
}
function ActiveStepFormComponent() {
  const { step } = useWizard();
  switch (step) {
    case 1:
      return (
        <Stepper.Step>
          <DocumentForm />
        </Stepper.Step>
      );
    case 2:
      return (
        <Stepper.Step>
          <CardForm />
        </Stepper.Step>
      );
    case 3:
      return (
        <Stepper.Step>
          <PalmFormRegister />
        </Stepper.Step>
      );
    case 4:
      return (
        <Stepper.Step>
          <ConfirmationFormRegister />
        </Stepper.Step>
      );
    default:
      return null;
  }
}

export default function StorePalmWizard() {
  const { step } = useWizard();
  const STEPS: Step[] = [
    { step: 1, label: "CPF", icon: <User /> },
    { step: 2, label: "Cartão", icon: <CreditCard /> },
    { step: 3, label: "Biometria", icon: <Hand /> },
    { step: 4, label: "Confirmação", icon: <Contact2 /> },
  ];
  return (
    <Stepper.Root className="md:w-3/4 w-full h-screen mx-auto bg-gray-600 p-4">
      <div className="w-full mb-4">
        <Link
          href="/store/palm"
          className="text-xs underline cursor-pointer text-white"
        >
          Ir para a página principal
        </Link>
      </div>
      <ul className="md:w-1/2 flex sm:justify-between justify-center w-full mx-auto mb-4 ">
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
      <ActiveStepFormComponent />
    </Stepper.Root>
  );
}
