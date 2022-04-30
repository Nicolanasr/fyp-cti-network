import React from 'react'

import SideMenu from "../../ui/SideMenu/SideMenu"
import TopMenu from '../../ui/TopMenu/TopMenu'

type Props = {}

const MainLayout = (props: Props) => {
    return (
        <div>
            <SideMenu />
            <div className="ml-20 lg:ml-80 relative">
                <TopMenu />
                <main className="w-full" style={{ height: "200vh" }}></main>
            </div>
        </div>
    )
}

export default MainLayout