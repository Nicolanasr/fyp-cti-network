import React from 'react'
import Link from "next/link"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Button from "../ui/shared/Button/Button"

type Props = {
    onSubmit: (e: IFormInputs, type: "login" | "signup") => void
}

interface IFormInputs {
    email: string,
    password: string,
    remember: boolean
}

const schema = yup.object({
    email: yup.string().email("E-mail not valid").required("E-mail is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at leaset 8 characters"),
    remember: yup.boolean()
}).required();

const LoginForm = ({ onSubmit }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onFormSubmit = (data: IFormInputs) => {
        onSubmit(data, "login");
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="my-4">
                <input {...register("email")} type="text" placeholder="E-mail *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.email?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("password")} type="Password" placeholder="Password *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.password?.message}</p>
            </div>

            <div className="w-full flex justify-between">
                <div>
                    <input {...register("remember")} type="checkbox" id="remember" />
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