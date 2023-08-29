'use client'
import NumericPad from '@/components/numericPad';
import ConfirmationForm from '@/components/wizard/forms/confirmation.form.register';
import PayWizard from '@/components/wizard/pay';
import { WizardContextProvider } from '@/context/wizard.context';
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';

interface PaymentForm {
    amount: string;
}

export default function Pay() {
    const methods = useForm<PaymentForm>();


    return <FormProvider {...methods}>
        <WizardContextProvider>
            <main className="flex min-h-screen items-center justify-between bg-gray-400">
                {!methods.formState.isSubmitted ? <PayWizard /> : <ConfirmationForm />}
            </main>
        </WizardContextProvider>
    </FormProvider>
}