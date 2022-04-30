import { NextPage } from 'next'
import React, { useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/router'

import { LoginForm, SignupForm } from '../../components/authenticationForms'

type Props = {}

const Login: NextPage = (props: Props) => {
    const router = useRouter();

    const [activeForm, setActiveForm] = useState<string>("login")

    const submitForm = (e: React.FormEvent, type: "login" | "signup") => {
        e.preventDefault();
        console.log(type, "--", e);
        router.push("/home");
    }

    return (
        <div className="min-h-screen w-full bg-primary-100 flex flex-col-reverse lg:flex-row">
            <div className="py-10 px-2 md:px-5 lg:px-10 flex-1 flex items-center justify-center lg:overflow-auto">
                <div className="h-fit w-fit m-auto text-center text-slate-100">
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

export default Login