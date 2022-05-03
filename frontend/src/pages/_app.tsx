import React from "react";
import Head from "next/head";

import { AuthProvider } from "../context/auth-context";

import type { AppProps } from "next/app";

import 'tailwindcss/tailwind.css'
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return <AuthProvider>
        <Head>
            <title>CTI Network</title>
        </Head>

        <Component {...pageProps} />
    </AuthProvider>
}

export default MyApp;
