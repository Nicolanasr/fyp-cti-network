import React from 'react'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Button from "../ui/shared/Button/Button"

type Props = {
    onSubmit: (e: IFormInputs, type: "login" | "signup") => void
}

interface IFormInputs {
    first_name: string,
    last_name?: string,
    email: string,
    username: string,
    password: string,
    password_confirm: string,
}

const schema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string(),
    username: yup.string().min(4, "Username must be at least 4 characters").required("E-mail is required"),
    email: yup.string().email("E-mail not valid").required("E-mail is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at leaset 8 characters"),
    password_confirm: yup.string().required("Confirm password is required")
        .min(8, "Password must be at leaset 8 characters")
        .oneOf([yup.ref('password')], 'Passwords must and should match'),
}).required();


const SignupForm = ({ onSubmit }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onFormSubmit = (data: IFormInputs) => {
        onSubmit(data, "signup");
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="my-4">
                <input {...register("first_name")} type="text" placeholder="First Name *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.first_name?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("last_name")} type="text" placeholder="Last Name" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.last_name?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("email")} type="email" placeholder="E-mail *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.email?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("username")} type="text" placeholder="Username *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.username?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("password")} type="password" placeholder="Password *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.password?.message}</p>
            </div>

            <div className="my-4">
                <input {...register("password_confirm")} type="password" placeholder="Re-enter password *" className="rounded-full w-full h-10  px-6 border-none text-black focus:outline-none" />
                <p className="text-red-600 text-sm text-left mx-4 my-2">{errors.password_confirm?.message}</p>
            </div>

            <div className="mt-6">
                <Button type="submit" className="w-full border-blue-500 text-blue-100">Create your account</Button>
            </div>
        </form>
    )
}

export default SignupForm