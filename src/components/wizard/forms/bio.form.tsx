import { useSocket } from "@/context/socket.context";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Fingerprint, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

interface UserForm {
    name: string;
    address: string;
    phone: string;
    document: string;
}
export default function BioForm() {
    const router = useRouter();
    const { nextStep } = useWizard();
    const {
        getValues,
    } = useFormContext<UserForm>();
    const [infoMessage, setInfoMessage] = useState<string>("Posicione seu dedo no leitor");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const validateBio = trpc.promotions.validateBio.useMutation();
    const { socket } = useSocket();
    const formattedDocument = getValues().document.replace(/[^0-9]/g, "");
    useEffect(() => {
        socket?.emit("register", () => formattedDocument);
        socket?.on("putIn", (message) => { setInfoMessage("Posicione seu dedo no leitor...") })
        socket?.on("takeOut", (message) => { setInfoMessage("Remova o dedo...") })
        socket?.on("started", (message) => { toast("Leitura iniciada") })
        socket?.on("success", async (message) => {
            try {
                console.log('SUCCESS');
                await validateBio.mutateAsync({ document: formattedDocument });
                nextStep()
                //router.push("/store");
                toast("Biometria cadastrada com sucesso!");
            } catch (error) {
                console.log({ error });
            }
        });

        return () => {
            socket?.off("success");
            socket?.off("started");
            socket?.off("putIn");
            socket?.off("takeOut");
        };
    }, [socket]);

    return (
        <div>
            <h2 className="font-bold text-5xl break-normal w-2/3 mb-4 text-white">
                Cadastrando biometria!
            </h2>
            <p className="text-white">{infoMessage}</p>
            <div className="flex flex-col justify-center items-center">
                {isSuccess ? (
                    <Fingerprint color="green" size={96} />
                ) : (
                    <Fingerprint className="animate-pulse" color="white" size={96} />
                )}
                {isLoading && (
                    <Loader
                        size={96}
                        color="white"
                        fill="white"
                        className="animate-spin"
                    />
                )}
            </div>
        </div>
    );
}
