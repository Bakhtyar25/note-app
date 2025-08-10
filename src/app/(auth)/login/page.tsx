import AuthImage from '@/components/auth/auth-image'
import LoginForm from '@/components/auth/login-form'
import React from 'react'

type Props = {}

export default function LoginPage({ }: Props) {
    return (
        <section className='flex flex-row justify-evenly items-center  container mx-auto pt-20'>
            <AuthImage />
            <LoginForm />
        </section>
    )
}