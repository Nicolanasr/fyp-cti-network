import React from 'react'

import Post, { PostType, Comment } from "../Post/Post"

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
        images: ["/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png", "/images/profile-img-placeholder.png"]
    }
]

const HomepageSection = (props: Props) => {
    return (
        <div className="w-full flex">
            <div className="h-full w-8/12 p-16">
                {
                    posts.map((post, index) => (
                        <>
                            <Post {...post} key={post.id} />
                            <hr className="my-8" />
                        </>
                    ))
                }
            </div>
            <div className="w-4/12 border-l p-16"></div>
        </div>
    )
}

export default HomepageSection