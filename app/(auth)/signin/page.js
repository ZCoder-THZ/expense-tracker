'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const { login, checkTokenInLocal } = useAuth();
    const passwordRef = useRef();
    const emailRef = useRef();
    const [pwdError, setPwdError] = useState(false)
    const [serverError, setServerError] = useState(false)

    useEffect(() => {
        const checkToken = async () => {
            const token = await localStorage.getItem('token');
            if (token) {
                return history.back()
            }
        }
        checkToken()
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const data = { email, password }


        try {
            const response = await axios.post(`${process.env.BASE_URL}/user/login`, data);


            const token = await response.data.data.tokenStr;//get token from response 

            login(token)

            router.push('/')

        } catch (error) {
            if (error.response.data.status == 401) {
                return setPwdError(!pwdError);

            }
            setServerError(!serverError)

            console.error('Error:', error.response ? error.response.data : error.message);
            // Additional error handling can go here
        }
    }
    return (
        <div className="">
            <Navbar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


                    <form onSubmit={submitHandler} className="space-y-6"  >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    ref={emailRef}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full bg-transparent text-white  rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full bg-transparent text-white  rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                        {
                            pwdError || serverError ? <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium ">{pwdError ? 'invalid Password' : ''} {serverError ? 'Server Error' : ''}</span>
                            </div>
                                : ''
                        }

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page