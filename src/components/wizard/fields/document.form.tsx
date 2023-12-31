"use client";
import NumericPad from "@/components/numericPad";
import { useWizard } from "@/context/wizard.context";
import { useEffect, HTMLProps } from "react";
import { UseFormRegister, useFormContext } from "react-hook-form";
interface UserForm {
  name: string;
  email: string;
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

const DocumentInput = ({ showError, register, ...props }: DocumentInputProps) => <div className="flex flex-col">
  <label htmlFor="document" className="font-semibold mb-2 text-white">
    CPF
  </label>
  <input
    placeholder="Ex.: 000-000-000-00"
    type="text"
    id="document"
    onChange={(e) => e.target.value = maskCPF(e.target.value)}
    {...register ? register("document") : undefined}
    {...props}
  />
  {showError && <span className="text-xs mt-1 text-red-600">Campo inválido</span>}
</div>


const invalidDocumentRegex =
  /^(?!000\.|111\.|222\.|333\.|444\.|555\.|666\.|777\.|888\.|999\.)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;

export default function DocumentForm() {
  const { nextStep } = useWizard();
  const { register, watch, setValue,
    formState: { touchedFields },
  } = useFormContext<UserForm>();
  const watchDocument = watch("document");
  const isValidDocument = invalidDocumentRegex.test(watchDocument);
  const formattedDocument = watchDocument?.replace(/[^0-9]/g, "")

  const setDocumentValue = (phone: string) => {
    setValue("document", maskCPF(phone));
  }

  useEffect(() => {
    setDocumentValue(watchDocument)
  }, [watchDocument]);

  return (
    <>
      <DocumentInput className="mb-5" register={register} showError={touchedFields.document && !isValidDocument} />
      <NumericPad className="w-1/2 mx-auto" value={formattedDocument} onChangeNumeric={(x) => setDocumentValue(x)} />
      <div className="flex justify-end mt-2">
        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded  p-2"
          disabled={!isValidDocument}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}

interface DocumentInputProps extends HTMLProps<HTMLInputElement> {
  showError?: boolean,
  register?: UseFormRegister<
    any>
}
