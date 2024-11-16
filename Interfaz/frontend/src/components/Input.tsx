import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
}


const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, variant, size_, ...props },
    ref
) {
    return (
        <input
            ref={ref}
            className={twMerge(clsx(inputVariants({ variant, size_, className })))}
            {...props}
        />
    );
});

export default Input;

const inputVariants = cva("rounded-md", {
    variants: {
        variant: {
            primary: "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2",
            secondary: "bg-white text-black px-4 py-2 my-2"
        },
        size_: {
            sm: "text-sm px-1 py-0",
            md: "text-base px-2 py-1",
            lg: "text-xl px-4 py-2",
        },
    },
    defaultVariants: {
        variant: "primary",
        size_: "md",
    }
})