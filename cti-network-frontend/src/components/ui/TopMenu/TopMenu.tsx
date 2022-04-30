import React from 'react'
import Image from "next/image"
import Link from "next/link"

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
            <div className="flex items-center gap-3">
                {/* notifications */}
                <Link href="/manage/notifications">
                    <a className="bg-gray-50 h-8 w-8 rounded-full flex items-center justify-center relative">
                        <Image src="/svg/bell.svg" layout="fixed" height="16" width="16" objectFit='contain' alt="notifications" />
                        {/* unread */}
                        <span className="absolute -top-1 right-0 text-xss h-4 w-4 rounded-full flex items-center justify-center bg-primary-100  text-white p-1"  >1</span>
                    </a>
                </Link>
                {/* messages */}
                <Link href="/messages">
                    <a className="bg-gray-50 h-8 w-8 rounded-full  flex items-center justify-center relative">
                        <Image src="/svg/envelope.svg" layout="fixed" height="16" width="16" objectFit='contain' alt="notifications" />
                        <span className="absolute -top-1 right-0 text-xss h-4 w-4 rounded-full flex items-center justify-center bg-primary-100  text-white p-1"  >3</span>
                    </a>
                </Link>
                <button tabIndex={0} className="bg-gray-50 h-8 w-8 rounded-full  flex items-center justify-center relative cursor-pointer group">
                    <Image src="/images/profile-img-placeholder.png" layout="fixed" height="16" width="16" objectFit='cover' alt="profile" />
                    <div className="absolute top-full right-0 w-36 mt-3 text-left bg-white shadow-xl hidden group-focus-within:block">
                        <div className="border-b py-2 px-6">
                            <Link href="#">
                                <a>Timeline</a>
                            </Link>
                        </div>
                        <div className="border-b py-2 px-6">
                            <Link href="#">
                                <a>Profile</a>
                            </Link>
                        </div>
                        <div className="border-b py-2 px-6">
                            <Link href="#">
                                <a>Notifications</a>
                            </Link>
                        </div>
                        <div className="border-b py-2 px-6">
                            <Link href="#">
                                <a>Messages</a>
                            </Link>
                        </div>
                        <div className="border-b py-2 px-6">
                            <Link href="#">
                                <a>Settings</a>
                            </Link>
                        </div>
                        <div className=" py-2 px-2">
                            <Link href="#">
                                <a className="flex items-center gap-2">
                                    <Image src="/svg/box-arrow-left.svg" layout="fixed" height={15} width={15} alt="logout" />
                                    Logout</a>
                            </Link>
                        </div>
                    </div>
                </button>
            </div>
        </header>
    )
}

export default TopMenu