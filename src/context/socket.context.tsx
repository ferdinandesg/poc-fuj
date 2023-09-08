"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type SocketContextProps = {
  socket: Socket | undefined;

};
const SocketContext = createContext<SocketContextProps | null>(null);
export function SocketProvider({ children, channel }: { children: ReactNode, channel: "reader" | "palm" }) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const instance = io(`${process.env.PMS_URL}/web`, {
      reconnectionDelayMax: 10000,
      query: { channel: JSON.stringify(channel) },

    });
    instance.on("error", (message) => toast(message));
    setSocket(instance);
  }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  return context;
}
