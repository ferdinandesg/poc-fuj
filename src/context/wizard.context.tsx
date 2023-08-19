"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  useFormContext,
} from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
  addressId: string;
}
type WizardContextProps = {
  step: number;
  nextStep: () => void;
  backStep: () => void;
};
const WizardContext = createContext<WizardContextProps | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

export const WizardContextProvider = ({ children }: ContextProviderProps) => {
  const [step, setStep] = useState<number>(1);
  const {
    formState: { isValid },
    getValues,
    handleSubmit
  } = useFormContext<UserForm>();
  const nextStep = () => {
    setStep((m) => m + 1);
    return;
  };

  const backStep = () => {
    setStep((m) => m - 1);
  };

  
  return (
    <WizardContext.Provider value={{ step, nextStep, backStep }}>
      {children}
    </WizardContext.Provider>
  );
};

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context)
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  return context;
}
