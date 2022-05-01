import React from 'react'
import type { NextPage } from "next";

import MainLayout from "../components/layout/MainLayout/MainLayout"
import HomepageSection from '../components/HomepageSection/HomepageSection';

const Home: NextPage = () => {
    return <>
        <MainLayout>
            <HomepageSection>

            </HomepageSection>
        </MainLayout>
    </>;
};

export default Home;
