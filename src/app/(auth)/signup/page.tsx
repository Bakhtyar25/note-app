import AuthImage from '@/components/auth/auth-image'
import SignupForm from '@/components/auth/signup-form'
import React from 'react'

type Props = object

export default function SignupPage({}: Props) {
  return (
    <section className='flex flex-col lg:flex-row justify-evenly items-center  container mx-auto pt-20'>
        <AuthImage />
        <SignupForm />
    </section>
  )
}