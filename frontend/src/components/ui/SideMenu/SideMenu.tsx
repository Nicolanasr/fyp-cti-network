import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import UserCard from "../shared/UserCard/UserCard";

import { IUser } from "../../../types/user";

type Props = {
    isOpen: boolean;
    toggle: () => void;
    userDetails: IUser;
};

const SideMenu = ({ isOpen, toggle, userDetails }: Props) => {
    const router = useRouter();

    const isLoggedIn: boolean = true;

    const isActive = (path: string): boolean => {
        return router.asPath === path;
    };

    return (
        <aside
            className={`flex flex-col w-full max-w-sm lg:w-80 h-screen shadow-xl fixed z-50 ${isOpen ? "left-0" : "-left-full"
                } lg:left-0 top-0 bottom-0 overflow-y-auto overflow-x-hidden`}
            style={{ transition: "left 400ms" }}
        >
            {/* close menu on mobile */}
            <button
                onClick={() => toggle()}
                className="lg:hidden absolute top-4 left-4 text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
            {/* Aside top */}
            <div className="h-80 w-full bg-primary-100 p-8 pb-0">
                {/* Logo */}
                <div className="text-center p-0">
                    <div className="mt-10 mx-auto h-10 w-full max-w-24 relative">
                        <Image
                            src="/logoipsum-logo-38.svg"
                            layout="fill"
                            alt="LOGO"
                        />
                    </div>
                    <span className="text-gray-50 text-xs mt-2 block">
                        CTI Social Network
                    </span>
                </div>

                {/* User card */}
                <div className="mt-8">
                    {isLoggedIn && (
                        <UserCard
                            name={`${userDetails.first_name} ${userDetails.last_name}`}
                            profileUrl={`user/${userDetails.username}`}
                            isVerified={userDetails.is_verified}
                            susbscribers={10}
                            profilePic={userDetails.avatar}
                            userType={userDetails.user_type}
                        />
                    )}
                </div>
            </div>

            {/* Aside bottom */}
            <nav className="flex-1 w-full bg-gray-50 p-12 pt-28 lg:pt-40 ">
                {/* Menu */}
                <ul className="p-0 m-0 list-none flex flex-col items-start gap-4">
                    <li>
                        <Link href="/home">
                            <a
                                className={`${isActive("/home")
                                    ? "font-bold"
                                    : "font-semibold"
                                    }`}
                            >
                                <span>H</span>
                                <span className="mx-2 inline">HOME</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/explore">
                            <a
                                className={`${isActive("/explore")
                                    ? "font-bold"
                                    : "font-semibold"
                                    }`}
                            >
                                <span>E</span>
                                <span className="mx-2 inline">EXPLORE</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/news">
                            <a
                                className={`${isActive("/news")
                                    ? "font-bold"
                                    : "font-semibold"
                                    }`}
                            >
                                <span>N</span>
                                <span className="mx-2 inline">NEWS</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideMenu;
