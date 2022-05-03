import React, { useContext } from 'react'
import { NextRouter, useRouter } from "next/router"

import { AuthContext } from '../../context/auth-context';


const withAuth = (Component: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        if (typeof window !== "undefined") {
            const router: NextRouter = useRouter();
            const userContext = useContext(AuthContext);

            const user = userContext.authState
            if (user !== null) {
                if (!user) {
                    router.replace("/authenticate");
                    return null;
                }
                else {
                    if (router.asPath === "/") {
                        router.replace("/home");
                        return null;
                    }
                    return (
                        <Component {...props} />
                    );
                }
            }
        }
    };
}

export default withAuth