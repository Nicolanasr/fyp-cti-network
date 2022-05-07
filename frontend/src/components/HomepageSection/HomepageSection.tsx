import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import axios from '../../utils/axios'
import { getCookie } from '../../utils/functions'

import Post from "../Post/Post"
import { IPost } from '../../types/post'

type Props = {
    children: React.ReactNode
}

const HomepageSection = (props: Props) => {
    const [posts, setPosts] = useState<IPost[]>([])
    console.log(posts);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios({
                    url: `/post/get_latest`,
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "Authorization": `Bearer ${getCookie("token")}`,
                    },
                }).then((res) => {
                    if (res.data.success === true) {
                        setPosts(res.data.data);
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [])


    return (
        <div className="w-full flex">
            <div className="h-full w-full md:w-8/12 pt-10 px-4 md:px-6 lg:pt-16 lg:px-12 xl:px-16">
                {
                    posts.map((post, index) => (
                        <div key={post._id}>
                            <Post {...post} />
                            <hr className="my-8" />
                        </div>
                    ))
                }
            </div>
            <div className="w-4/12 border-l hidden md:block pt-10 px-4 md:px-6 lg:pt-16 2xl:px-16 max-w-md mx-auto">
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
    )
}

export default HomepageSection