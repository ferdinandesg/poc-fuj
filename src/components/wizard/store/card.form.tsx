import { useSocket } from "@/context/socket.context";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
interface CardFormProps {
  document: string;
}
interface UserForm {
  name: string;
  address: string;
  phone: string;
  document: string;
}
export default function CardForm() {
  const router = useRouter();
  const { nextStep, backStep } = useWizard();
  const {
    formState: { touchedFields },
    getValues,
  } = useFormContext<UserForm>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const register = trpc.promotions.validateCard.useMutation();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("receive_tap", () => {
      setLoading(true);
    });
    socket?.on("receive_token", async (cardToken) => {
      try {
        const document = getValues().document.replace(/[^0-9]/g, "");
        const response = await register.mutateAsync({ cardToken, document });
        console.log({ response, cardToken });
        setLoading(false);
        setSuccess(true);
        router.push("/store");
        toast("Usuário cadastrado com sucesso!");
      } catch (error) {
        console.log({ error });
      }
    });

    return () => {
      socket?.off("receive_token");
    };
  }, [socket]);

  return (
    <div>
      <h2 className="font-bold text-5xl break-normal w-2/3 mb-4">
        Finalizando cadastro!
      </h2>
      <span className="flex">Aproxime o cartão no validador ao lado</span>
      <div className="flex flex-col justify-center items-center">
        {isSuccess ? (
          <CreditCard color="green" size={96} />
        ) : (
          <CreditCard className="animate-pulse" size={96} />
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
