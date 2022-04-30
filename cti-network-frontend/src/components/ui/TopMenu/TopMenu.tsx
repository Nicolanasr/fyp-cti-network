import React from 'react'
import Image from "next/image"

type Props = {}

const TopMenu = (props: Props) => {
    return (
        <header className="flex justify-between items-center sticky top-0 left-0 right-0 p-4 px-6 bg-white border-b shadow-sm">
            <div className="w-full max-w-xl " >
                <form className="flex items-center">
                    <label htmlFor="search">
                        <Image src="/svg/search.svg" alt="search" layout="fixed" height={15} width={15} objectFit="contain" />
                    </label>
                    <input id='search' name='search' type="text" placeholder='Search: people, postts, news...' className="bg-transparent focus:outline-none w-full mx-2 text-sm" />
                </form>
            </div>
            <div>menu</div>
        </header>
    )
}

export default TopMenu