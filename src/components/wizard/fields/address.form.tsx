"use client";
import NumericPad from "@/components/numericPad";
import { useWizard } from "@/context/wizard.context";
import { Loader } from "lucide-react";
import { FocusEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
interface AddressType {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
interface UserForm {
  name: string;
  email: string;
  phone: string;
  addressId: string;
  document: string;
}
const maskCEP = (cep: string) => {
  if (!cep) return "";

  return cep
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};
export default function Address() {
  const { nextStep, backStep } = useWizard();
  const { register, setValue, watch } = useFormContext<UserForm>();
  const [address, setAddress] = useState<AddressType>()
  const [isLoading, setLoading] = useState<boolean>(true);
  const watchCep = watch("addressId");
  const isCepValid = /^\d{5}-\d{3}$/.test(watchCep);
  const formattedCep = watchCep?.replace(/[^0-9]/g, "")

  const setAddressValue = (phone: string) => {
    setValue("addressId", maskCEP(phone));
  }

  useEffect(() => {
    setAddressValue(watchCep)
  }, [watchCep]);

  const searchAddress = async () => {
    if (watchCep.length !== 9) return
    setLoading(true)
    const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`)
    const address = await response.json()
    setAddress(address)
    setLoading(false)
  }

  return (
    <>

      <div className="flex flex-col mb-5">
        <label htmlFor="address" className="font-semibold mb-2 text-white">
          CEP
        </label>
        <input
          placeholder="Ex.: 12345-000"
          type="text"
          id="address"
          {...register("addressId")}
          onBlur={searchAddress}
        />
      </div>
      {address && <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col mb-5">
          <label htmlFor="street" className="font-semibold mb-2 text-white">
            Rua
          </label>
          <input
            value={address.logradouro}
            type="text"
            readOnly
            id="street"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="neighborhood" className="font-semibold mb-2 text-white">
            Bairro
          </label>
          <input
            value={address.bairro}
            type="text"
            readOnly
            id="neighborhood"
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="city" className="font-semibold mb-2 text-white">
            Cidade
          </label>
          <input
            value={address.localidade}
            type="text"
            readOnly
            id="city"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="uf" className="font-semibold mb-2 text-white">
            Estado
          </label>
          <input
            value={address.uf}
            type="text"
            readOnly
            id="uf"
          />
        </div>

      </div>}
      {isLoading && (
        <div className="bg-black bg-opacity-25 flex items-center justify-center mb-5">
          {" "}
          <Loader
            size={96}
            color="white"
            fill="white"
            className="animate-spin"
          />{" "}
        </div>
      )}
      <NumericPad className="w-1/2 mx-auto" value={formattedCep} onChangeNumeric={(x) => setAddressValue(x)} />

      <div className="flex justify-between mt-2">
        <button
          className="hover:bg-red-500 hover:text-white bg-white border-red-500 rounded text-red-500 border p-2"
          onClick={backStep}
        >
          Voltar
        </button>
        <button
          className="disabled:bg-white bg-gray-800 text-white border-gray-600 border disabled:text-gray-600 rounded  p-2"
          disabled={!isCepValid || isLoading}
          onClick={nextStep}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
