"use client";
import { useWizard } from "@/context/wizard.context";
import Stepper from "../stepper";
import NameForm from "./fields/name.form";
import DocumentForm from "./fields/document.form";
import AddressForm from "./fields/address.form";
import PhoneForm from "./fields/phone.form";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { User, Phone, Home, Wallet2, CircleDollarSign, Fingerprint, Contact2, Check } from "lucide-react";
import ConfirmationForm from "./forms/confirmation.form";
import Link from "next/link";
import PaymentForm from "./forms/pay.form";
import BioFormIdentify from "./forms/bio.form.identify";
import SuccessForm from "./forms/success.form";
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
                    <PaymentForm />
                </Stepper.Step>
            );
        case 2:
            return (
                <Stepper.Step>
                    <BioFormIdentify />
                </Stepper.Step>
            );
        case 3:
            return (
                <Stepper.Step>
                    <ConfirmationForm />
                </Stepper.Step>
            ); case 3:
            return (
                <Stepper.Step>
                    <SuccessForm />
                </Stepper.Step>
            );
        default:
            return null;
    }
}

export default function PayWizard() {
    const { step } = useWizard();
    const STEPS: Step[] = [
        { step: 1, label: "Valor", icon: <CircleDollarSign /> },
        { step: 2, label: "Biometria", icon: <Fingerprint /> },
        { step: 3, label: "Confirmação", icon: <Contact2 /> },
        { step: 4, label: "Sucesso!", icon: <Check /> },
    ];
    return (
        <Stepper.Root className="md:w-3/4 w-full h-screen mx-auto bg-gray-600 p-4">
            <div className="w-full mb-4">
                <Link href="/store" className="text-xs underline cursor-pointer hover:text-gray-200 text-white">Ir para a página principal</Link>

            </div>
            <ul className="md:w-1/2 flex justify-center gap-2 w-full mx-auto mb-4 ">
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
