import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../../utils/axios'

import { getCookie } from '../../utils/functions'

import withAuth from "../../components/HOC/withAuth"

import MainLayout from "../../components/layout/MainLayout/MainLayout"
import Post from "../../components/Post/Post"

import { IPost } from "../../types/post"
import LoaderSpinner from '../../components/ui/shared/LoaderSpinner/LoaderSpinner'

type Props = {}

const PostBySlug = ({ }: Props) => {
    const [postInfo, setPostInfo] = useState<IPost | "loading">("loading")

    const router = useRouter();

    useEffect(() => {
        try {
            axios({
                url: `/post/${router.query.post_slug}`,
                method: "GET",
                data: {

                },
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                },
            }).then((res) => {
                if (res.data.success === true) {
                    setPostInfo(res.data.data)
                }
                else {
                    throw new Error("error")
                }
            })
                .catch(err => {
                    console.error(err);
                    router.replace("/");
                })
        } catch (err) {
            console.error(err);
            router.replace("/");
        }
    }, [router])

    return (
        <MainLayout>
            {
                postInfo === "loading" ?
                    <LoaderSpinner />
                    :
                    <div className="my-8">
                        <Post withDetails key={Math.random()} {...postInfo} />
                    </div>
            }
        </MainLayout>
    )
}

export default withAuth(PostBySlug)