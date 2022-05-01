import React, { useState } from 'react'

import SideMenu from "../../ui/SideMenu/SideMenu"
import TopMenu from '../../ui/TopMenu/TopMenu'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

    const toggleSideMenu = (): void => {
        setSideMenuOpen((p) => !p);
    }

    return (
        <div className="">
            <SideMenu isOpen={sideMenuOpen} toggle={toggleSideMenu} />
            <div className="ml-0 lg:ml-80 relative">
                <TopMenu toggleSideMenu={toggleSideMenu} />
                <main className="w-full h-full">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout