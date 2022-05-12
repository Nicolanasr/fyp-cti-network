import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'

import axios from '../../utils/axios'
import { getCookie } from '../../utils/functions'

import { IPost } from '../../types/post'

import Post from "../Post/Post"
import NewPostForm from '../NewPostForm/NewPostForm'

type Props = {
    children: React.ReactNode
}

const HomepageSection = (props: Props) => {
    const [posts, setPosts] = useState<IPost[]>([])

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

    const handleNewPostForm = async (e: FormEvent, text: string | undefined, files: File[]) => {
        e.preventDefault()
        const data = new FormData();
        data.append("text", text || "");
        files.forEach(function (file, i) {
            data.append("files[]", file);
        });

        try {
            await axios({
                url: `/post/new`,
                method: "POST",
                data: data,
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.success === true) {
                    let tmp_posts = [...posts];
                    tmp_posts.unshift(res.data.data);
                    setPosts(tmp_posts);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="w-full flex">
            <div className="h-full w-full">
                <div className="my-12">
                    <NewPostForm handleFormSubmit={handleNewPostForm} />
                </div>
                <div className="mt-8">
                    {
                        posts.map((post, index) => (
                            <div key={Math.random()}>
                                <Post key={Math.random()} {...post} />
                                <hr className="my-8" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomepageSection