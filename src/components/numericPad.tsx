'use client'

import { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Delete } from "lucide-react"

type NumericPadProps = HtmlHTMLAttributes<HTMLDivElement> & {
    value: string
    onChangeNumeric: (value: string) => void
}
export default function NumericPad({ value, onChangeNumeric, ...props }: NumericPadProps) {
    const handleButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const char = e.currentTarget.id.split("-")[1]
        const newValue = value + char
        onChangeNumeric(newValue)
        return;
    }
    const erase = () => {
        const newValue = value.substring(0, value.length - 1)
        onChangeNumeric(newValue)
    }
    return <div className={twMerge("grid grid-cols-3 gap-3", props.className)}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map(x =>
            <div onClick={e => handleButtonClick(e)} className="hover:bg-white hover:text-gray-600 cursor-pointer text-white p-2 rounded-full
                border border-white text-center select-none" id={`char-${x}`} key={`char-${x}`}>
                {x}
            </div>
        )}
        <div></div>
        {
            ["0"].map(x => <div onClick={e => handleButtonClick(e)} className="hover:bg-white hover:text-gray-600 cursor-pointer text-white p-2 rounded-full
                border border-white text-center select-none" id={`char-${x}`} key={`char-${x}`}>
                {x}
            </div>)
        }
        <div onClick={erase} id={`char-x`} key={`char-x`} className='hover:bg-white hover:text-gray-600 cursor-pointer text-white  
                border-white select-none rounded-full flex items-center justify-center'>
            <Delete size={"2.5rem"} />
        </div>
    </div>
}