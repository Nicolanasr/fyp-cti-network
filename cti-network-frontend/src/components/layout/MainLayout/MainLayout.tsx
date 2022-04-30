import React from 'react'

import SideMenu from "../../ui/SideMenu/SideMenu"

type Props = {}

const MainLayout = (props: Props) => {
    return (
        <div>
            <SideMenu />
            <main></main>
        </div>
    )
}

export default MainLayout