"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  useFormContext,
  FieldErrors,
  UseFormWatch,
  FieldValues,
  UseFormGetFieldState,
} from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
  phone: string;
  document: string;
  address: string;
}
type WizardContextProps = {
  step: number;
  create: () => void;
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
    formState: { errors, isValid },
    getValues,
    control: { getFieldState },
    watch,
  } = useFormContext<UserForm>();
  const nextStep = () => {
    setStep((m) => m + 1);
    return;
  };

  const backStep = () => {
    setStep((m) => m - 1);
  };

  const create = () => {
    console.log({ formValid: isValid });
    console.log(getValues());
    if (!isValid) return;
  };
  return (
    <WizardContext.Provider value={{ step, nextStep, backStep, create }}>
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
