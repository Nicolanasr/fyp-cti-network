import type { NextPage } from "next";
import React, { useEffect } from 'react'
import { NextRouter, useRouter } from "next/router"

type Props = {}

const Index: NextPage = (props: Props) => {
    const isLoggedIn = false;

    const router: NextRouter = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/home");
        }
        else {
            router.push("/authenticate");
        }
    }, [router, isLoggedIn])


    return (
        <div></div>
    )
}

export default Index