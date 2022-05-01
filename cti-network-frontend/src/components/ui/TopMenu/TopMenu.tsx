import React from 'react'
import Image from "next/image"
import Link from "next/link"

import Dropdown from "../shared/Dropdown/Dropdown"

type Props = {}

const dropdownItems: {
    text: string,
    url: string,
    icon?: string
}[] = [
        {
            text: "Timeline",
            url: "/home",
        },
        {
            text: "Profile",
            url: "/manage/profile",
        },
        {
            text: "Notifications",
            url: "/manage/notifications",
        },
        {
            text: "Messages",
            url: "/manage/messages",
        },
        {
            text: "Settings",
            url: "/manage/settings",
        },
        {
            text: "Logout",
            url: "/authenticate/logout",
            icon: "/svg/box-arrow-left.svg"
        },
    ]


const TopMenu = (props: Props) => {
    return (
        <header className="flex justify-between items-center sticky top-0 left-0 right-0 p-4 px-6 bg-white border-b shadow-sm z-50">
            <div className="w-full max-w-xl " >
                <form className="flex items-center">
                    <label htmlFor="search">
                        <Image src="/svg/search.svg" alt="search" layout="fixed" height={15} width={15} objectFit="contain" />
                    </label>
                    <input id='search' name='search' type="text" placeholder='Search: people, postts, news...' className="bg-transparent focus:outline-none w-full mx-2 text-sm" />
                </form>
            </div>
            <div className="flex items-center gap-3">
                {/* notifications */}
                <MenuIcon href="/manage/notifications" icon="/svg/bell.svg" number={3} />
                {/* messages */}
                <MenuIcon href="/manage/messages" icon="/svg/envelope.svg" number={0} />

                <Dropdown image="/images/profile-img-placeholder.png">
                    {
                        dropdownItems.map((item, index) => (
                            <div key={item.text + index} className={`${(index === dropdownItems.length - 1) ? "" : "border"}  py-2 px-4`}>
                                <Link href={item.url}>
                                    {
                                        item.icon ?
                                            <a className="flex items-center gap-2">
                                                <Image src={item.icon} layout="fixed" height={15} width={15} alt={item.text} />
                                                {item.text}</a>
                                            :
                                            <a>{item.text}</a>
                                    }
                                </Link>
                            </div>
                        ))
                    }
                </Dropdown>
            </div>
        </header>
    )
}

export default TopMenu

const MenuIcon = ({ href, icon, number }: { href: string, icon: string, number: number }) => {
    return (
        <Link href={href}>
            <a className="bg-gray-50 h-8 w-8 rounded-full flex items-center justify-center relative">
                <Image src={icon} layout="fixed" height="16" width="16" objectFit='contain' alt="notifications" />
                {/* unread */}
                {
                    number > 0 && (
                        <span className="absolute -top-1 right-0 text-xss h-4 w-4 rounded-full flex items-center justify-center bg-primary-100  text-white p-1">
                            {number}
                        </span>

                    )}
            </a>
        </Link>
    )
}
