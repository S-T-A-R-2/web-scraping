// Definir los tipos de las props para cada componente
import React from 'react';

const validate_user = (): void => {
    let b: string | undefined;
};

interface ButtonProps {
    onClick: (...args: any[]) => void;
    text: string;
    args?: any[];
}

export function Button({ onClick, text, args = [] }: ButtonProps) {
    return (
        <button
            className="inline-flex px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
            onClick={() => onClick(...args)}
        >
            {text}
        </button>
    );
}

interface InputProps {
    oldText: string;
    onChange: (newText: string) => void;
    placeholder?: string;
}

export function Input({ oldText, onChange, placeholder }: InputProps) {
    return (
        <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
