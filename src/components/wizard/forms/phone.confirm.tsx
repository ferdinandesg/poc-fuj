import { useFormContext } from "react-hook-form";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader, MailCheck } from "lucide-react";

interface UserForm {
    phone: string;
    document: string;
}

const ToastMessage = (title: string, message: string) => <div>
    <h2>{title}</h2>
    <p className="text-sm">{message}</p>
</div>


export default function PhoneConfirm() {
    const router = useRouter()
    const { getValues } = useFormContext<UserForm>();
    const [smsCode, setSmsCode] = useState<string>("9134")
    const validateSmsMutation = trpc.promotions.validatePhone.useMutation()

    useEffect(() => {
        if (!validateSmsMutation.error) return
        toast(ToastMessage("Erro", validateSmsMutation.error.message))
    }, [validateSmsMutation.error])
    const Input = ({ i }: { i: number }) => {
        return <input onChange={handleInputChange} type="text" id={`input-${i}`} name={`input-${i}`}
            className="text-center text-lg rounded shadow-inner shadow-gray-300 border-gray-300 focus:shadow-orange-300 focus:border focus:border-orange-500 border border-transparent transition p-4"
            maxLength={1}
            size={1}
            min={0}
            max={9}
            pattern="[0-9]{1}" />
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const index = +e.currentTarget.id.split("-")[1]
        const splitted = smsCode.split("")
        splitted[index] = ""
        const input = document.getElementById(`input-${+index + 1}`)
        if (!input) return
        input.focus()
    }

    async function handleForm(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            const phone = getValues().phone.replace(/[^0-9]/g, "")
            const document = getValues().document.replace(/[^0-9]/g, "")
            await validateSmsMutation.mutateAsync({ code: smsCode, phone, document })
            toast(ToastMessage("Sucesso!", "Seu número foi validado com sucesso!"))
            router.push("/")
        } catch (error) {

        }
    }

    return <div className="md:w-3/4 w-full h-screen mx-auto bg-lime-100 p-4">
        <h2 className="font-bold text-5xl break-normal w-2/3 mb-4">Nós te enviamos um código por SMS</h2>
        <span className="flex">No número: {getValues().phone} <MailCheck className="ml-2" color="green" /> </span>
        <form onSubmit={e => handleForm(e)} id="form" className="flex flex-col">
            <div className="flex gap-2 p-2 justify-center">
                {Array(4).fill(null).map((_, i) => <Input key={`input-${i}`} i={i} />)}
            </div>
            <div className="flex justify-end mt-3">
                <button
                    className="disabled:bg-orange-400 bg-orange-600 rounded text-white p-2 w-1/2 flex justify-center"
                    disabled={validateSmsMutation.isLoading}
                >
                    <span className="relative flex w-1/2 justify-center mx-auto" >
                        Confirmar
                        {validateSmsMutation.isLoading && <Loader className="absolute right-5 animate-spin" />}
                    </span>

                </button>

            </div>
        </form>


    </div>
}