import React from 'react'
import Image from "next/image"

type Props = {
    children: React.ReactNode,
    image?: string
}

const Dropdown = ({ children, image }: Props) => {
    return (
        <a tabIndex={0} className="bg-gray-50 h-8 w-8 rounded-full flex items-center justify-center relative cursor-pointer group">
            {
                image &&
                <Image src={image} layout="fixed" height="16" width="16" objectFit='cover' alt={image} />
            }
            <div className="absolute top-full right-0 w-36 mt-3 text-left bg-white shadow-xl hidden group-focus-within:block group-focus:block">
                {children}
            </div>
        </a>
    )
}

export default Dropdown