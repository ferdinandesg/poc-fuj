import { useSocket } from "@/context/socket.context";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Fingerprint, Hand, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

interface UserForm {
    name: string;
    address: string;
    phone: string;
    document: string;
}
export default function PalmFormRegister() {
    const router = useRouter();
    const ref = useRef<HTMLParagraphElement>(null)
    const { nextStep } = useWizard();
    const { getValues } = useFormContext<UserForm>();
    const [infoMessage, setInfoMessage] = useState<string>(
        "Posicione sua mão leitor"
    );
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const validatePalm = trpc.promotions.validatePalm.useMutation();
    const { socket } = useSocket();
    const formattedDocument = getValues().document.replace(/[^0-9]/g, "");

    useEffect(() => {
        ref.current?.classList.add("bg-gray-400")
        setTimeout(() => {
            ref.current?.classList.remove("bg-gray-400")
        }, 500)
    }, [infoMessage])
    useEffect(() => {
        socket?.emit("register", formattedDocument);
        socket?.on("putIn", (message) =>
            setInfoMessage(message)
        );
        socket?.on("takeOut", (message) =>
            setInfoMessage(message)
        );
        socket?.on("notify", (message) =>
            setInfoMessage(message)
        );
        socket?.on("success", async () => {
            try {
                setLoading(true)
                await validatePalm.mutateAsync({ document: formattedDocument });
                setLoading(false)
                toast("Mão cadastrada com sucesso!");
                nextStep();
            } catch (error: any) {
                if (error?.message) toast(error.message)
                console.log({ error });
            }
        });

        return () => {
            socket?.off("success");
            socket?.off("started");
            socket?.off("notify");
            socket?.off("putIn");
            socket?.off("takeOut");
        };
    }, [socket]);

    return (
        <div>
            <h2 className="font-bold text-5xl break-normal w-2/3 mb-4 text-white">
                Cadastrando biometria!
            </h2>
            <p ref={ref} className="text-white transition p-2 rounded text-center">{infoMessage}</p>
            <div className="flex flex-col justify-center items-center">
                {isSuccess ? (
                    <Hand color="green" size={96} />
                ) : (
                    <Hand className="animate-pulse" color="white" size={96} />
                )}
                {isLoading && (
                    <Loader
                        size={96}
                        color="white"
                        fill="white"
                        className="animate-spin mt-5"
                    />
                )}
            </div>
        </div>
    );
}
