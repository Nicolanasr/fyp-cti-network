import React, { useState, useEffect } from "react";

import axios from "../utils/axios";

import { getCookie } from "../utils/functions";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);

    // checks if the user is authenticated or not
    const isAuthenticated = async () => {
        try {
            const res = await axios({
                url: `/user/verify_token`,
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                },
            })
            setAuthState(res.data.data);
            return true;
        } catch (e) {
            setAuthState(false);
            return false;
        }
    };

    useEffect(() => {
        isAuthenticated();
    }, [])

    return (
        <Provider
            value={{
                authState,
                setAuthState,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };