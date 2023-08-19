import { ReactNode, useContext, useState, createContext, SetStateAction, Dispatch } from "react";

type ModalContextProps = {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextProps | null>(null);
type ContextProviderProps = {
    children: ReactNode;
};

export const ModalContextProvider = ({ children }: ContextProviderProps) => {
    const [showModal, setShowModal] = useState<boolean>(true)
    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export function useModal() {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error(
            "useSocketContext must be used within a SocketContextProvider"
        );
    return context;
}
