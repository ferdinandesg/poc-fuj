"use client";

import { useModal } from "@/context/modal.context";
import { X } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
interface ModalProps {
    children: ReactNode
    title: string
    onConfirm: () => void
}
export function BasicModal({ children, title, onConfirm }: ModalProps) {
    const { setShowModal } = useModal()
    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            id="error-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3
                                className="flex justify-between"
                                id="modal-title"
                            >
                                <span className="text-lg leading-6 font-medium text-gray-900 ">{title}</span>
                                <X className="cursor-pointer hover:text-gray-500 transition" onClick={() => setShowModal(false)} />
                            </h3>
                            <div className="mt-4">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={onConfirm}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
