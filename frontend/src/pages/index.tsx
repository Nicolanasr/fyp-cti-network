import type { NextPage } from "next";
import React from 'react'

import withAuth from "../components/HOC/withAuth";

type Props = {}

const Index: NextPage = (props: Props) => {
    return (
        <div></div>
    )
}

export default withAuth(Index)