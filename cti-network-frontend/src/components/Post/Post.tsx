import React from 'react'
import Image from "next/image"
import Link from "next/link"

import { timeSince } from "../../utils/functions"

export interface Comment {
    comment_author: string,
    comment_text: string,
    posted_date: Date,
    likes_count: number,
    replies?: Comment[]
}

export interface PostType {
    id: number,
    author_pic: string,
    author_name: string,
    posted_date: Date,
    text: string,
    images?: string[]
    likes_count?: number,
    comments?: Comment[],
    post_url: string
}

const Post = ({ author_name, author_pic, id, post_url, posted_date, text, comments, images, likes_count }: PostType) => {
    return (
        <div className="flex w-full max-w-3xl">
            <div className="w-10 h-10 relative rounded-full bg-slate-50 overflow-hidden">
                <Link href={`/profile/${author_name}`}>
                    <a>
                        <Image src={author_pic} layout="fixed" height={40} width={40} objectFit="cover" alt={author_name} />
                    </a>
                </Link>
            </div>
            <div className="flex-1 mx-4 ">
                <Link href={post_url} >
                    <a >
                        {/* post header part */}
                        <div className="h-10">
                            <div className="mb-1">
                                <Link href={`/profile/${author_name}`}>
                                    <a className="font-semibold">{author_name} </a>
                                </Link>
                                <span> has posted an update.</span>
                            </div>
                            <div className="text-gray-500 text-xs">
                                {timeSince(posted_date)}
                            </div>
                        </div>
                        {/* post content */}
                        <div className="w-full ">
                            <p className="my-4 whitespace-pre-wrap">{text}</p>
                            {
                                images && images.length > 0 &&
                                <div className={`aspect-square max-w-xl my-2 grid gap-1 ${images.length === 1 ? "grid-cols-1" : images.length >= 2 ? "grid-cols-2" : ""}`}>
                                    {
                                        images.map((image, img_index) => (
                                            img_index < 4 &&
                                            <div key={image + img_index} className="h-full w-full relative">
                                                <Image src={image} layout="responsive" height={100} width={100} objectFit="cover" objectPosition="center" alt={"post image " + image} />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </a >
                </Link >
                {/* post actions bar */}
                <div className="my-3 py-3 border-y flex gap-4 text-sm">
                    {/* like */}
                    <button className="flex items-center">
                        {/* icon */}
                        <span className="relative" style={{ top: "1px" }}>
                            <Image src="/svg/hand-thumbs-up.svg" layout='fixed' height={16} width={16} objectFit="contain" alt="like" />
                        </span>
                        <span className="mx-2 ">Like</span>
                        {/* count */}
                        <span className="px-1 text-xs text-gray-500 bg-gray-50 border rounded-full">{likes_count}</span>
                    </button>
                    {/* comment */}
                    <button className="flex items-center">
                        <span className="mx-2 ">Comment</span>
                        {
                            comments &&
                            <span className="px-1 text-xs text-gray-500 bg-gray-50 border rounded-full">{comments.length}</span>
                        }
                    </button>
                    {/* share */}
                    <button className="flex items-center">
                        <span className="mx-2 ">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post