import { useSocket } from "@/context/socket.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface CardFormProps {
  document: string;
}
export default function CardForm({ document }: CardFormProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const register = trpc.promotions.validateCard.useMutation();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("receive_token", async (cardToken) => {
      try {
        setLoading(true);
        const response = await register.mutateAsync({ cardToken, document });
        console.log({ response, cardToken });
        setLoading(false);
        router.push("/");
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
      {isLoading && (
        <div className="absolute w-screen h-screen bg-black bg-opacity-25 flex items-center justify-center">
          {" "}
          <Loader
            size={96}
            color="white"
            fill="white"
            className="animate-spin"
          />{" "}
        </div>
      )}

      <CreditCard className="animate-pulse" size={96} />
    </div>
  );
}
