import AuthImage from '@/components/auth/auth-image'
import SignupForm from '@/components/auth/signup-form'
import React from 'react'

type Props = {}

export default function SignupPage({}: Props) {
  return (
    <section className='flex flex-row justify-evenly items-center  container mx-auto pt-20'>
        <AuthImage />
        <SignupForm />
    </section>
  )
}