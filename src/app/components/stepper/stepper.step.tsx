import { HtmlHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface StepperRootProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Step({ children, ...props }: StepperRootProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col w-1/2 mx-auto justify-center mt-5",
        props.className
      )}
    >
      {children}
    </div>
  );
}
