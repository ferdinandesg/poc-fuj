"use client";
import { BasicModal } from "@/components/modal/basic.modal";
import { useModal } from "@/context/modal.context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

const maskCPF = (doc: string) => {
    if (!doc) return "";
    return doc
        .replace(/[\D]/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

export default function UserHome() {
    const router = useRouter()
    return (

        <div>None</div>
    );
}
