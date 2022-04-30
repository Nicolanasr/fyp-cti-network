import React from "react";
import Head from "next/head";

import type { AppProps } from "next/app";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>CTI Network</title>
        </Head>

        <Component {...pageProps} />
    </>;
}

export default MyApp;
