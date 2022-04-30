import React from 'react'
import Image from "next/image"
import Link from "next/link"

type Props = {
    name: string,
    profileUrl: string,
    isVerified: boolean,
    profilePic: string,
    susbscribers: number
}

const UserCard = ({ name, profileUrl, isVerified, profilePic, susbscribers }: Props) => {
    return (
        <div className="h-fit w-full max-w-sm relative">
            {/* front card */}
            <div className="lg:h-full w-full m-auto p-1 py-4 lg:p-7 bg-white lg:rounded-2xl shadow-md relative z-10">
                {/* profile image */}
                <div className="h-10 w-10 lg:h-16 lg:w-16 p-3 m-auto border rounded-full overflow-hidden flex justify-center items-center">
                    <Link href={profileUrl}>
                        <a className="block relative h-5 w-5 lg:h-10 lg:w-10">
                            <Image src={profilePic} layout="fill" objectFit="cover" objectPosition="center" alt="profile" />
                        </a>
                    </Link>
                </div>

                {/* profile name */}
                <div className="w-fit m-auto mt-2 text-xs lg:text-sm group">
                    <Link href={profileUrl}>
                        <a>
                            <span className="transition-all font-medium group-hover:text-secondary-100 group-hover:underline">{name}</span>
                            {isVerified && <span className="ml-2">V</span>}
                        </a>
                    </Link>
                </div>
                <div className=" text-xs text-gray-400 text-center mt-1 mb-3">
                    Member
                </div>

                <div className="my-4 hidden lg:block">
                    <hr />
                </div>

                {/* subscribers */}
                <div className="w-fit m-auto text-center hidden lg:block ">
                    <span className="text-base font-medium text-gray-700">{susbscribers}</span> <br />
                    <div className="text-xs text-gray-400">Subscribers</div>
                </div>
            </div>

            {/* back card */}
            <div className="w-11/12 h-full mx-auto bg-gray-50 hidden lg:block rounded-2xl shadow-md absolute top-4 bottom-0 left-0 right-0 z-0"></div>
        </div>
    )
}

export default UserCard