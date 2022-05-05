import React, { useState, useEffect, useContext } from 'react'
import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router"
import Image from "next/image"

import { AuthContext } from '../../context/auth-context';

import axios from "../../utils/axios"

import withNotAuth from '../../components/HOC/withNotAuth';
import { LoginForm, SignupForm } from '../../components/authenticationForms'

type Props = {}

const Login: NextPage = (props: Props) => {
    const router: NextRouter = useRouter();
    const user = useContext(AuthContext);

    const [activeForm, setActiveForm] = useState<string>("login")

    useEffect(() => {
        user.authState ? router.push("/home") : "";

    }, [user, router])


    const submitForm = async (postedData: any, type: "login" | "signup") => {
        try {
            await axios({
                url: `/user/${type === "login" ? "signin" : "register"}`,
                method: "POST",
                data: postedData,
                withCredentials: true
            }).then((res) => {
                document.cookie = `token=${res.data?.tokens?.token}; SameSite= None; Secure=true; expires=${new Date(res.data?.tokens?.expires)}; `;
                user.setAuthState(res.data.data)
                router.push("/home");
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="min-h-screen w-full bg-primary-100 flex flex-col-reverse lg:flex-row">
            <div className="py-10 px-2 md:px-5 lg:px-10 flex-1 flex items-center justify-center lg:overflow-auto">
                <div className="h-fit w-fit m-auto text-center text-gray-50">
                    <div className="text-center">
                        <h1 className="text-3xl">Don{"'"}t miss on any new cyber threat</h1>
                        <h2 className='text-lg my-2'>Join CTI Network now</h2>
                    </div>
                    {/* form */}
                    <div className="mt-8 w-full max-w-xs mx-auto">
                        {
                            activeForm === "login" ? <LoginForm onSubmit={submitForm} />
                                : activeForm === "signup" ? <SignupForm onSubmit={submitForm} />
                                    : <></>
                        }
                    </div>

                    {
                        activeForm === "login" ?
                            <button onClick={() => setActiveForm("signup")} type='button' className="my-3 mx-auto">Create an account </button>
                            : activeForm === "signup" ? <button onClick={() => setActiveForm("login")} type='button' className="my-3 mx-auto">Login to your account </button>
                                : <></>
                    }
                </div>
            </div>
            <div className="flex-1 relative ">
                <Image src="/images/cyber-background.jpg" layout="fill" objectFit="cover" objectPosition="center" alt="cyber background" />
            </div>
        </div>
    )
}

export default withNotAuth(Login)