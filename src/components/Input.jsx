import React from "react";

function Input({
    label,
    id,
    type,
    required,
    errors,
    disabled,
    onChange,
    name,
}) {
    return (
        <div className="w-full max-w-md flex justify-center flex-col ">
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-100 text-left"
            >
                {label}
            </label>

            <div className="mt-1 flex flex-col">
                <input
                    name={name}
                    required={required}
                    type={type}
                    id={id}
                    autoComplete={id}
                    disabled={disabled}
                    onChange={onChange}
                    className={`w-full px-4 py-2 text-[#F8F8F2]  border border-[#44475A] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#212121] transition duration-200 ${
                        disabled && "opacity-50 cursor-not-allowed"
                    }`}
                />
            </div>
        </div>
    );
}

export default Input;
// bg-[#1E1E2E]
