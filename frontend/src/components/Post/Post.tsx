import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"

import axios from '../../utils/axios'
import { getCookie } from '../../utils/functions'

import { IPost } from '../../types/post'

import { timeSince } from "../../utils/functions"

export interface Comment {
    comment_author: string,
    comment_text: string,
    posted_date: Date,
    likes_count: number,
    replies?: Comment[]
}

const Post = ({ _id, author, comments, created_at, images, likes, text, liked_by_user, url }: IPost) => {
    const [readMoreText, setReadMoreText] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<{ liked: boolean, total_likes: number }>(
        {
            liked: liked_by_user ? true : false,
            total_likes: likes ? likes.length : 0
        }
    )

    const postLikeHandler = async () => {
        try {
            await axios({
                url: `/post/like`,
                method: "POST",
                withCredentials: true,
                data: {
                    post_id: _id
                },
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.success === true) {
                    if (res.data.message === "Post unliked successfully!") {
                        setUserLiked(() => ({ liked: false, total_likes: res.data?.data?.total_likes }));
                    } else {
                        setUserLiked(() => ({ liked: true, total_likes: res.data?.data?.total_likes }));
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="flex w-full max-w-3xl flex-col sm:flex-row">
            <div className="w-10 h-10 relative rounded-full bg-gray-50/[0.5] overflow-hidden">
                <Link href={`/profile/${author?.username}`}>
                    <a>
                        <Image src={author?.avatar || "/images/profile-img-placeholder.png"} layout="fill" objectFit="cover" alt={author?.first_name} />
                    </a>
                </Link>
            </div>
            <div className="flex-1 mt-1 sm:mt-0 sm:mx-4">
                {/* <Link href={post_url} >
                    <a > */}
                {/* post header part */}
                <div className="h-10 flex justify-between">
                    <div>
                        <div className="mb-1">
                            <Link href={`/profile/${author?.username}`}>
                                <a className="font-semibold">{`${author?.first_name} ${author?.last_name}`} </a>
                            </Link>
                            <span> has posted an update.</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                            {created_at && timeSince(new Date(created_at))}
                        </div>
                    </div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </button>
                </div>
                {/* post content */}
                <div className="w-full ">
                    <p className="my-4 whitespace-pre-wrap">
                        {
                            text && text.length > 170 && !readMoreText ?
                                <>
                                    {text.substring(0, 170) + "... "}
                                    <button className="text-secondary-100 z-10"
                                        onClick={() => setReadMoreText(true)}>
                                        read more
                                    </button>
                                </>
                                : text
                        }
                    </p>
                    {
                        images && images.length > 0 &&
                        <div className={`aspect-square max-w-xl my-2 grid gap-1 rounded-xl shadow overflow-hidden ${images.length === 1 ? "grid-cols-1" : images.length >= 2 ? "grid-cols-2" : ""}`}>
                            {
                                images.map((image, img_index) => (
                                    img_index < 4 &&
                                    <div key={image + img_index} className="h-full w-full relative">
                                        <Image src={image} layout="fill" objectFit="cover" objectPosition="center" alt={"post image " + image} />
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                {/*</a >
                </Link > */}

                {/* post actions bar */}
                <div className="my-3 py-3 border-y flex gap-4 text-sm">
                    {/* like */}
                    <button className="flex items-center" onClick={() => postLikeHandler()}>
                        {/* icon */}
                        <span className={`relative ${userLiked.liked ? "text-secondary-100" : ""}`} style={{ top: "-2px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            </svg>
                        </span>
                        <span className={`mx-2 ${userLiked.liked ? "text-secondary-100" : ""}`}>Like</span>
                        {/* count */}
                        <span className={`px-2 text-xs ${userLiked.liked ? "text-secondary-100 bg-secondary-100/[0.1]" : "text-gray-500 bg-gray-100"} rounded-full`}>{userLiked.total_likes}</span>

                    </button>
                    {/* comment */}
                    <button className="flex items-center">
                        <span className="mx-2 ">Comment</span>
                        {
                            comments &&
                            <span className={`px-2 text-xs text-gray-500 bg-gray-100 rounded-full`}>{comments.length}</span>
                        }
                    </button>
                    {/* share */}
                    <button className="flex items-center">
                        <span className="mx-2 ">Share</span>
                    </button>
                </div>

                {/* post comment */}
                <div className="w-full">
                    {
                        comments && comments?.length > 0 ? <></>
                            :
                            <>No comments</>
                    }
                </div>
            </div>
        </div >
    )
}

export default Post