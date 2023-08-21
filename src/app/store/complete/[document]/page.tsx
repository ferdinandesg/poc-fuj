'use client'
import CardForm from "@/components/wizard/fields/card.form"
import { useState } from 'react'

interface CompleteRegisterParams {
    params: {
        document: string
    }
}
export default function Complete({ params }: CompleteRegisterParams) {
    return <div className="bg-lime-500">
        <div className="md:w-3/4 w-full h-screen mx-auto bg-lime-100 p-4">
            <h2 className="font-bold text-5xl break-normal w-2/3 mb-4">Finalizando cadastro!</h2>
            <span className="flex">Aproxime o cartão no validador ao lado</span>
            <div className="flex  justify-center items-center h-1/3">
                <CardForm document={params.document} />
            </div>
        </div>
    </div>
}