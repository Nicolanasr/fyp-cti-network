import React, { useEffect, useContext } from 'react'
import Router from 'next/router'

import { AuthContext } from '../../context/auth-context';

import axios from '../../utils/axios'

const Logout = () => {
    const user = useContext(AuthContext);
    useEffect(() => {
        const logout = async () => {
            try {
                document.cookie = `token=`;
                user.setAuthState(false)
                Router.replace("/");
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