import React from 'react'
import Link from "next/link"

import Button from "../ui/shared/Button/Button"

type Props = {
    onSubmit: (e: React.FormEvent, type: "login" | "signup") => void
}

const LoginForm = ({ onSubmit }: Props) => {
    return (
        <form onSubmit={(e) => onSubmit(e, "login")}>
            <div className="my-4">
                <input name="email" type="text" placeholder="Username or email *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>

            <div className="my-4">
                <input name="password" type="Password" placeholder="Password *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>
            <div className="w-full flex justify-between">
                <div>
                    <input type="checkbox" id="remember" name="remember" />
                    <label className="mx-1" htmlFor="remember">Remember me</label>
                </div>
                <div>
                    <Link href="/authenticate/reset-password">
                        <a>Forgot password?</a>
                    </Link>
                </div>
            </div>
            <div className="mt-6">
                <Button type="submit" className="w-full border-blue-500 text-blue-100">Login to your account</Button>
            </div>
        </form>
    )
}

export default LoginForm