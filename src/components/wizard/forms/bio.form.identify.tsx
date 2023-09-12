import { useSocket } from "@/context/socket.context";
import { useWizard } from "@/context/wizard.context";
import { trpc } from "@/utils/trpc";
import { CreditCard, Fingerprint, Hand, Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

interface UserForm {
  name: string;
  address: string;
  phone: string;
  document: string;
}
export default function BioFormIdentify() {
  const { nextStep } = useWizard();
  const {} = useFormContext<UserForm>();
  const { setValue } = useFormContext<UserForm>();
  const [infoMessage, setInfoMessage] = useState<string>(
    "Posicione no leitor"
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const validateBio = trpc.promotions.validateBio.useMutation();
  const { socket } = useSocket();
  const pathname = usePathname();

  useEffect(() => {
    console.log("emitou");
    console.log(socket?.connected);

    socket?.emit("identify");
    socket?.on("putIn", () => {
      setInfoMessage("Posicione no leitor...");
    });
    socket?.on("takeOut", () => {
      setInfoMessage("Remova o dedo...");
    });

    socket?.on("error", () => {
      socket?.emit("identify");
    });
    socket?.on("started", () => {
      toast("Leitura iniciada");
    });
    socket?.on("success", async (document: string) => {
      try {
        console.log({ document });

        toast("Carregando informações de usuário...!");
        const user = await validateBio.mutateAsync({ document });
        if (user.document) setValue("document", user.document);
        if (user.name) setValue("name", user.name);
        if (user.phone) setValue("phone", user?.phone);
        if (user.addressId) setValue("address", user.addressId || "");
        nextStep();
        toast("Biometria validada com sucesso!");
      } catch (error) {
        if (typeof error === "string") toast(error);
        console.log({ error });
      }
    });

    return () => {
      socket?.off("success");
      socket?.off("started");
      socket?.off("error");
      socket?.off("putIn");
      socket?.off("takeOut");
    };
  }, [socket]);

  return (
    <div>
      <h2 className="font-bold text-5xl break-normal w-2/3 mb-4 text-white">
        Identificando biometria!
      </h2>
      <p className="text-white">{infoMessage}</p>
      <div className="flex flex-col justify-center items-center gap-2 mb-5">
        {pathname.includes("reader") ? (
          <Fingerprint className="animate-pulse" color="white" size={96} />
        ) : (
          <Hand className="animate-pulse" color="white" size={96} />
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
