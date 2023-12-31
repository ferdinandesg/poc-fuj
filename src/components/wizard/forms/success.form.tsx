import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessForm() {
    const router = useRouter()
    return <div className="flex flex-col text-white gap-4 items-center">
        <h2 className="text-4xl font-semibold " >Sucesso!</h2>
        <span>Pagamento realizado com sucesso!</span>
        <span><Check color="lightgreen" size={72} className="border-4 border-green-300 rounded-full p-2" /></span>
        <button
            className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded p-2 w-full text-center"
            onClick={() => router.back()}>
            Voltar
        </button>
    </div>
}