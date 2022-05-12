import React, { useState, useContext } from 'react'
import Link from 'next/link';

import SideMenu from "../../ui/SideMenu/SideMenu"
import TopMenu from '../../ui/TopMenu/TopMenu'

import { AuthContext } from "../../../context/auth-context";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

    const userDetails = useContext(AuthContext).authState;

    const toggleSideMenu = (): void => {
        setSideMenuOpen((p) => !p);
    }

    return (

        <div className="">
            <SideMenu userDetails={userDetails} isOpen={sideMenuOpen} toggle={toggleSideMenu} />
            <div className="ml-0 lg:ml-80 relative">
                <TopMenu toggleSideMenu={toggleSideMenu} />
                <div className="flex items-stretch relative">
                    <main className="w-full md:w-8/12 px-4 md:px-6 lg:px-12 xl:px-16 relative">
                        {children}
                    </main>
                    {/* right */}
                    <div className="w-4/12 min-h-screen border-l hidden md:block pt-10 px-4 md:px-6 lg:pt-16 2xl:px-16 max-w-md mx-auto">
                        <div className="sticky top-20">
                            <div className="w-full h-96 bg-gray-100 rounded-2xl"></div>
                            <div className="my-4 text-xs text-gray-400 flex flex-wrap">
                                <Link href="/">
                                    <a className="mx-2">Home</a>
                                </Link>
                                <Link href="/">
                                    <a className="mx-2">About Us</a>
                                </Link>
                                <Link href="/">
                                    <a className="mx-2">FAQs</a>
                                </Link>
                                <Link href="/">
                                    <a className="mx-2">Blog</a>
                                </Link>
                                <Link href="/">
                                    <a className="mx-2">Contact</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainLayout
