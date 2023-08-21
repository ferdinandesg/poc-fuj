"use client";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { useEffect, HTMLProps } from "react";
import { UseFormRegister, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
interface UserForm {
  name: string;
  address: string;
  phone: string;
  document: string;
}

const maskCPF = (doc: string) => {
  if (!doc) return "";
  return doc
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const invalidDocumentRegex =
  /^(?!000\.|111\.|222\.|333\.|444\.|555\.|666\.|777\.|888\.|999\.)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;

export default function DocumentForm() {
  const { nextStep, backStep } = useWizard();
  const {
    register,
    watch,
    setValue,
    formState: { touchedFields },
  } = useFormContext<UserForm>();
  const userMutation = trpc.users.getByDocument.useMutation();
  const watchDocument = watch("document");
  const isValidDocument = invalidDocumentRegex.test(watchDocument);
  useEffect(() => {
    setValue("document", maskCPF(watchDocument));
  }, [watchDocument]);
  const handleNextStep = async () => {
    try {
      const formattedDocument = watchDocument.replace(/[^0-9]/g, "");
      const user = await userMutation.mutateAsync({
        document: formattedDocument,
      });
      if (user.name) setValue("name", user.name);
      if (user.phone) setValue("phone", user?.phone);
      setValue("address", user.addressId || "");
      nextStep();
    } catch (error: any) {
      if (error?.message) toast(error.message);
    }
  };
  return (
    <>
      <DocumentInput
        register={register}
        showError={touchedFields.document && !isValidDocument}
      />
      <div className="flex justify-between mt-2">
        <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-orange-400 bg-orange-600 rounded text-white p-2"
          disabled={!isValidDocument}
          onClick={handleNextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}

interface DocumentInputProps extends HTMLProps<HTMLInputElement> {
  showError?: boolean;
  register?: UseFormRegister<any>;
}
export const DocumentInput = ({
  showError,
  register,
  ...props
}: DocumentInputProps) => (
  <div className="flex flex-col">
    <label htmlFor="document" className="font-semibold mb-2">
      CPF
    </label>
    <input
      placeholder="Ex.: 000-000-000-00"
      type="text"
      id="document"
      onChange={(e) => (e.target.value = maskCPF(e.target.value))}
      {...(register ? register("document") : undefined)}
      {...props}
    />
    {showError && (
      <span className="text-xs mt-1 text-red-600">Campo inválido</span>
    )}
  </div>
);
