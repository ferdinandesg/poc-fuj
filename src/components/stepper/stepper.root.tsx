import { HtmlHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface StepperRootProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export default function Root({children, ...props }: StepperRootProps){
    
    return <div className={twMerge("flex flex-col", props.className)}> {children}  </div>
}