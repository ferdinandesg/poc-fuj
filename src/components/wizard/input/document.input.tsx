import { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";

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
interface DocumentInputProps extends HTMLProps<HTMLInputElement> {
    showError?: boolean,
    register?: UseFormRegister<
        any>
}

export const DocumentInput = ({ showError, register, ...props }: DocumentInputProps) => <div className="flex flex-col">
    <label htmlFor="document" className="font-semibold mb-2">
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