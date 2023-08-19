import { HtmlHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface StepperRootProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Step({ children, ...props }: StepperRootProps) {
  return (
    <div
      className={twMerge(
        "md:w-1/2 w-full flex flex-col mx-auto justify-center mt-5",
        props.className
      )}
    >
      {children}
    </div>
  );
}
