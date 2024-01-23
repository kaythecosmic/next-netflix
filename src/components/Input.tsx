import React from "react"

interface InputProps {
    id: string;
    onchange: any;
    value: string;
    label: string;
    type: string;
}

const Input: React.FC<InputProps> = ({
    id, onchange, value, label, type
}) => {
    return (
        <div className='relative'>
            <input
                className='block rounded-md px-6 pt-6 pb-3 w-full text-md text-white bg-zinc-800 font-semibold focus:outline-none  appearance-none focus:ring-0 peer'
                type={type}
                onChange={onchange}
                value={value}
                id={id}
                placeholder=" " />

            <label
                className='absolute text-md text-zinc-200 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                htmlFor={id}>
                {label}
            </label>
        </div>

    )
}

export default Input
