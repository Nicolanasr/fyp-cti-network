import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/router';

import UserCard from '../shared/UserCard/UserCard';

type Props = {}

const SideMenu = (props: Props) => {
    const router = useRouter();

    const isLoggedIn: boolean = true;

    const isActive = (path: string): boolean => {
        return router.asPath === path
    }

    return (
        <aside className="flex flex-col w-20 lg:w-80 h-screen shadow-xl fixed top-0 bottom-0 left-0 overflow-y-auto overflow-x-hidden">
            {/* Aside top */}
            <div className="h-80 w-full bg-primary-100 p-0 lg:p-8 pb-0">
                {/* Logo */}
                <div className="text-center px-2 lg:p-0">
                    <div className="mt-10 mx-auto h-10 w-full max-w-24 relative">
                        <Image src="/logoipsum-logo-38.svg" layout="fill" alt="LOGO" />
                    </div>
                    <span className="text-slate-100 text-xs mt-2 hidden lg:block">CTI Social Network</span>
                </div>

                {/* User card */}
                <div className="mt-8">
                    {
                        isLoggedIn && <UserCard name="John Doe" profileUrl="/user/john-doe" isVerified={true} susbscribers={10} profilePic="/images/profile-img-placeholder.png" />
                    }
                </div>
            </div>


            {/* Aside bottom */}
            <nav className="flex-1 w-full bg-slate-100 p-2 py-4 lg:p-12 lg:pt-40 ">
                {/* Menu */}
                <ul className="p-0 m-0 list-none flex flex-col items-center lg:items-start gap-4">
                    <li>
                        <Link href="/home">
                            <a className={`${isActive("/home") ? "font-bold" : "font-semibold"}`}>
                                <span>H</span>
                                <span className="mx-2 hidden lg:inline">HOME</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/explore">
                            <a className={`${isActive("/explore") ? "font-bold" : "font-semibold"}`}>
                                <span>E</span>
                                <span className="mx-2 hidden lg:inline">EXPLORE</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/news">
                            <a className={`${isActive("/news") ? "font-bold" : "font-semibold"}`}>
                                <span>N</span>
                                <span className="mx-2 hidden lg:inline">NEWS</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideMenu