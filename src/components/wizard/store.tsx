"use client";
import { useWizard } from "@/context/wizard.context";
import Stepper from "../stepper";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { CreditCard, Fingerprint, User } from "lucide-react";
import Link from "next/link";
import ConfirmationForm from "./forms/confirmation.form";
import CardForm from "./store/card.form";
import DocumentForm from "./fields/document.form";
import BioForm from "./forms/bio.form";
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
            ); case 3:
            return (
                <Stepper.Step>
                    <BioForm />
                </Stepper.Step>
            );
        case 4:
            return (
                <Stepper.Step>
                    <ConfirmationForm />
                </Stepper.Step>
            );
        default:
            return null;
    }
}

export default function StoreWizard() {
    const { step } = useWizard();
    const STEPS: Step[] = [
        { step: 1, label: "CPF", icon: <User /> },
        { step: 2, label: "Cartão", icon: <CreditCard /> },
        { step: 3, label: "Biometria", icon: <Fingerprint /> },
    ];
    return (
        <Stepper.Root className="md:w-3/4 w-full h-screen mx-auto bg-gray-600 p-4">
            <div className="w-full mb-4">
                <Link href="/store" className="text-xs underline cursor-pointer text-white">Ir para a página principal</Link>

            </div>
            <ul className="md:w-1/4 flex sm:justify-between justify-center w-full mx-auto mb-4 ">
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
                        <span className="text-white text-sm hidden md:block">{x.label}</span>
                    </li>
                ))}
            </ul>
            <ActiveStepFormComponent />
        </Stepper.Root>
    );
}
