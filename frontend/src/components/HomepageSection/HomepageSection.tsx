import React from 'react'
import Link from 'next/link'

import Post, { PostType } from "../Post/Post"

type Props = {
    children: React.ReactNode
}

const posts: PostType[] = [
    {
        id: Math.random(),
        author_pic: "/images/cyber-background.jpg",
        author_name: "John Doe",
        posted_date: new Date("01-14-2022"),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?  ",
        post_url: "/post/1",
        likes_count: 23,
        comments: [
            {
                comment_author: "John Doe 2",
                comment_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. D",
                posted_date: new Date(),
                likes_count: 2
            }
        ]
    },
    {
        id: Math.random(),
        author_pic: "/images/collaboration.png",
        author_name: "John Doe 2",
        posted_date: new Date("10-14-2020"),
        text: "Lorem ipsum dolor sit met consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?   Lorem ipsum dolor sit met consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?  ",
        post_url: "/post/1",
        likes_count: 3,
        images: ["https://i.picsum.photos/id/5/1920/1920.jpg?hmac=GdRDq7onYZrtCOFaKhRsrUYa8BsL1FtWO544JT1K3Dc", "https://i.picsum.photos/id/905/1920/1920.jpg?hmac=6vJfYAWFeqwglaD_XoNuM8md6u7T8UEScbfL46HuN-4"]
    },
    {
        id: Math.random(),
        author_pic: "/images/cyber-background.jpg",
        author_name: "John Doe",
        posted_date: new Date("01-14-2022"),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?  ",
        post_url: "/post/1",
        likes_count: 23,
        comments: [
            {
                comment_author: "John Doe 2",
                comment_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. D",
                posted_date: new Date(),
                likes_count: 2
            }
        ]
    },
    {
        id: Math.random(),
        author_pic: "/images/cyber-background.jpg",
        author_name: "John Doe",
        posted_date: new Date("01-14-2022"),
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?  ",
        post_url: "/post/1",
        likes_count: 23,
        comments: [
            {
                comment_author: "John Doe 2",
                comment_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. D",
                posted_date: new Date(),
                likes_count: 2
            }
        ]
    },
    {
        id: Math.random(),
        author_pic: "/images/collaboration.png",
        author_name: "John Doe 2",
        posted_date: new Date("10-14-2020"),
        text: "Lorem ipsum dolor sit met consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?   Lorem ipsum dolor sit met consectetur adipisicing elit. Doloribus enim, facere culpa, nisi explicabo saepe architecto exercitationem, aspernatur unde voluptatibus quaerat labore. Nihil in laboriosam repellendus dolorem porro exercitationem dolor?  ",
        post_url: "/post/1",
        likes_count: 3,
        images: ["/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png"]
    }
]

const HomepageSection = (props: Props) => {
    return (
        <div className="w-full flex">
            <div className="h-full w-full md:w-8/12 pt-10 px-4 md:px-6 lg:pt-16 lg:px-12 xl:px-16">
                {
                    posts.map((post, index) => (
                        <div key={post.id}>
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