import React from 'react'
import Image from "next/image"
import Link from "next/link"

import { UserType } from "../../../../types/user"

type Props = {
    name: string,
    profileUrl: string,
    isVerified: boolean,
    profilePic?: string,
    susbscribers: number,
    userType: UserType
}

const UserCard = ({ name, profileUrl, isVerified, profilePic = "/images/profile-img-placeholder.png", susbscribers, userType }: Props) => {
    return (
        <div className="h-fit w-full max-w-sm relative">
            {/* front card */}
            <div className="h-full w-full m-auto p-7 bg-white rounded-2xl shadow-md relative z-10">
                {/* profile image */}
                <div className="h-10 w-10 lg:h-16 lg:w-16 m-auto border rounded-full overflow-hidden flex justify-center items-center">
                    <Link href={profileUrl}>
                        <a className="block relative h-14 w-14 rounded-full overflow-hidden">
                            <Image src={profilePic} layout="fill" objectFit="cover" objectPosition="center" alt="profile" />
                        </a>
                    </Link>
                </div>

                {/* profile name */}
                <div className="w-fit m-auto mt-2 text-sm group">
                    <Link href={profileUrl}>
                        <a className="flex items-center">
                            <span className="transition-all font-medium capitalize group-hover:text-secondary-100 group-hover:underline" style={{ paddingTop: "3px" }}>{name.toLowerCase()}</span>
                            {isVerified && <span className="ml-2 flex" title="trusted">
                                <Image src="/images/verified.png" layout="fixed" height={15} width={15} objectFit="contain" alt="verified" />
                            </span>}
                        </a>
                    </Link>
                </div>
                <div className=" text-xs text-gray-400 text-center mt-1 mb-3 capitalize">
                    {UserType[userType].toLowerCase()}
                </div>

                <div className="my-4 block">
                    <hr />
                </div>

                {/* subscribers */}
                <div className="w-fit m-auto text-center block ">
                    <span className="text-base font-medium text-gray-700">{susbscribers}</span> <br />
                    <div className="text-xs text-gray-400">Subscribers</div>
                </div>
            </div>

            {/* back card */}
            <div className="w-11/12 h-full mx-auto bg-gray-50 block rounded-2xl shadow-md absolute top-4 bottom-0 left-0 right-0 z-0"></div>
        </div>
    )
}

export default UserCard