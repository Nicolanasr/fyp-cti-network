import React, { useEffect, useContext } from 'react'
import Router from 'next/router'

import { AuthContext } from '../../context/auth-context';

import axios from '../../utils/axios'

const Logout = () => {
    const user = useContext(AuthContext);
    useEffect(() => {
        const logout = async () => {
            try {
                await axios({
                    url: `/user/logout`,
                    method: "GET",
                    withCredentials: true
                }).then(() => {
                    user.setAuthState(false)
                    Router.replace("/");
                });
            } catch (e) {
                console.error(e);
            }
        }
        logout();
    }, [])

    return (
        <></>
    )
}

export default Logout