"use client";
import { useWizard } from "@/context/wizard.context";
import Stepper from "../stepper";
import NameForm from "./fields/name.form";
import DocumentForm from "./fields/document.form";
import AddressForm from "./fields/address.form";
import PhoneForm from "./fields/phone.form";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { User, Phone, Home, Wallet2 } from "lucide-react";
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
          <NameForm />
        </Stepper.Step>
      );
    case 2:
      return (
        <Stepper.Step>
          <DocumentForm />
        </Stepper.Step>
      );
    case 3:
      return (
        <Stepper.Step>
          <AddressForm />
        </Stepper.Step>
      );
    case 4:
      return (
        <Stepper.Step>
          <PhoneForm />
        </Stepper.Step>
      );
    default:
      return null;
  }
}

export default function UserWizard() {
  const { step } = useWizard();
  const STEPS: Step[] = [
    { step: 1, label: "Nome", icon: <User /> },
    { step: 2, label: "CPF", icon: <Wallet2 /> },
    { step: 3, label: "Endereço", icon: <Home /> },
    { step: 4, label: "Telefone", icon: <Phone /> },
  ];
  return (
    <Stepper.Root className="w-3/4 h-screen mx-auto bg-lime-100  p-4">
      <ul className="flex justify-between w-1/2 mx-auto mb-4 ">
        {STEPS.map((x) => (
          <li
            key={`step-${x.label}`}
            className={twMerge(
              "p-4 rounded flex flex-col items-center w-24  border-4 gap-2",
              x.step > step
                ? "bg-orange-400 border-transparent"
                : "bg-orange-600 border-white"
            )}
          >
            <span className="font-semibold text-white">{x.icon}</span>
            <span className="text-white text-sm">{x.label}</span>
          </li>
        ))}
      </ul>
      <ActiveStepFormComponent />
    </Stepper.Root>
  );
}
