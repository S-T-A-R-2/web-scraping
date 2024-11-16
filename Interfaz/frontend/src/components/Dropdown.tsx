import Button from "./Button";

interface DropdownOption {
    label: string;
    onClick?: () => void;
}

interface DropdownProps {
    buttonText: string | undefined;
    action: () => void;
    isActive: boolean;
    options: DropdownOption[];
    showHeader: boolean;
}

export default function Dropdown({buttonText, action, isActive, options, showHeader}: DropdownProps){
    return (
        <div className='text-white bg-zinc-800 flex flex-col m-auto'>
            <Button onClick={action} type='button'>
                {buttonText}
                {showHeader && (
                    <svg
                    className={`w-5 h-5 ml-2 transform ${isActive ? "rotate-180" : "rotate-0"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </Button>
            
            {isActive && (
                <div className="flex bg-white rounded-md shadow-lg z-10 m-auto">
                    <ul >
                        {options.map((option, index) => (
                        <li key={index}>
                        <Button onClick={option.onClick} type='button' className="px-4 py-2 bg-white w-full">
                            {option.label}
                        </Button>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}