import React from 'react'

import SideMenu from "../../ui/SideMenu/SideMenu"
import TopMenu from '../../ui/TopMenu/TopMenu'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className="">
            <SideMenu />
            <div className="ml-20 lg:ml-80 relative">
                <TopMenu />
                <main className="w-full h-full container mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout