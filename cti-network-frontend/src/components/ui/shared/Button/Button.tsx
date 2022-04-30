import React from 'react'

type Props = {
    children: string,
    type?: "button" | "submit" | "reset",
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className: string
}

const Button = ({ children, type, onClick, className }: Props) => {
    return (
        <button onClick={(e) => { onClick && onClick(e) }} className={`${className} px-6 py-2 border-2 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`} type={type}>{children}</button>
    )
}

export default Button