import { useSocket } from "@/context/socket.context";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
export default function CardFormComplete() {
  const { nextStep, backStep } = useWizard();
  const { getValues } = useFormContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const validateCard = trpc.promotions.validateCard.useMutation();
  const { socket } = useSocket();
  useEffect(() => {
    socket?.on("receive_token", async (cardToken) => {
      try {
        const formattedDocument = getValues().document?.replace(/[^0-9]/g, "");

        setLoading(true);
        const response = await validateCard.mutateAsync({
          cardToken,
          document: formattedDocument,
        });
        console.log({ response, cardToken });
        setLoading(false);
        nextStep();
      } catch (error) {
        console.log({ error });
      }
    });
    return () => {
      socket?.off("receive_token");
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center">
      <CreditCard className="animate-pulse" size={96} />
      {isLoading && (
        <div className="flex items-center justify-center">
          {" "}
          <Loader
            size={96}
            color="white"
            fill="white"
            className="animate-spin"
          />{" "}
        </div>
      )}
    </div>
  );
}
