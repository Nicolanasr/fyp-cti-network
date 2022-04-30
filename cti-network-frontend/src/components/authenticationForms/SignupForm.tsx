import React from 'react'

import Button from "../ui/shared/Button/Button"

type Props = {
    onSubmit: (e: React.FormEvent, type: "login" | "signup") => void
}

const SignupForm = ({ onSubmit }: Props) => {
    return (
        <form onSubmit={(e) => onSubmit(e, "signup")}>
            <div className="my-4">
                <input name="email" type="email" placeholder="E-mail *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>

            <div className="my-4">
                <input name="username" type="text" placeholder="Username *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>

            <div className="my-4">
                <input name="password" type="password" placeholder="Password *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>

            <div className="my-4">
                <input name="password-2" type="password" placeholder="Re-enter password *" required className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
            </div>

            <div className="mt-6">
                <Button type="submit" className="w-full border-blue-500 text-blue-100">Create your account</Button>
            </div>
        </form>
    )
}

export default SignupForm