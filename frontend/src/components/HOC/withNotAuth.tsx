
import React, { useContext } from 'react'
import { NextRouter, useRouter } from "next/router"

import { AuthContext } from '../../context/auth-context';


const withNotAuth = (Component: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        if (typeof window !== "undefined") {
            const router: NextRouter = useRouter();
            const userContext = useContext(AuthContext);

            const user = userContext.authState
            if (user !== null) {
                if (user) {
                    router.replace("/home");
                    return null;
                }
                else {
                    return (
                        <Component {...props} />
                    );
                }
            }
        }
    };
}

export default withNotAuth