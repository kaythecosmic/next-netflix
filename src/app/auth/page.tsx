"use client"
import React, { useCallback, useState } from 'react'
import Input from '@/components/Input'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {

    const router  = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [varient, setVarient] = useState('login');

    const toggleVarient = useCallback(() => {
        setVarient((currentVarient) => currentVarient == "login" ? "register" : "login")
    }, [])

    /* 
    Register Handler 
    Calling the page in the "api/register" 
    */
    const register = useCallback(async () => {
        console.log("The List is printied in page.tsx\n");
        console.log(email);
        console.log(username);
        console.log(password);

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                email,
                username,
                password
            });

            console.log(response.data);
            router.push("/home");
            
        } catch (error) {
            console.log("Hello")
            console.log("There was an error.\n");
        }

    }, [email, username, password])


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email, password, redirect: false, callbackUrl: '/'
            });
        } catch (error) {
            console.log(error);

        }
    }, [email, password])


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black w-full h-full lg:bg-opacity-50'>

                <nav className="px-12 py-10">
                    <img src="/images/logo.png" className='h-12' alt="An Image" />
                </nav>

                <div className='flex justify-center'>
                    <div className=' bg-zinc-900 mx-auto px-16 py-12 rounded-lg self-center bg-opacity-60 backdrop-blur-sm lg:w-2/5 sm:w-4/5 sm:h-3/5'>
                        <h2 className=' text-white text-4xl font-semibold mb-8'>
                            {varient == "login" ? "Sign in" : "Register"}
                        </h2>
                        <div className='flex flex-col gap-6'>

                            {varient == "register" && (
                                <Input
                                    type='email'
                                    id='email'
                                    label='Email'
                                    value={email}
                                    name='email'
                                    onchange={(event: any) => setEmail(event.target.value)}
                                />
                            )}

                            <Input
                                type='username'
                                id='username'
                                label='Username'
                                name='username'
                                value={username}
                                onchange={(event: any) => setUsername(event.target.value)}
                            />
                            <Input
                                type='password'
                                id='password'
                                label='Password'
                                value={password}
                                name='password'
                                onchange={(event: any) => setPassword(event.target.value)}
                            />
                        </div>

                        <button onClick={varient == 'login' ? login : register} className='bg-red-600 text-white rounded mt-5 p-2 w-full text-lg hover:bg-red-900 duration-150'>
                            {varient == "register" ? "Register" : "Login"}
                        </button>

                        <p className=' text-zinc-400 mt-10 text-wrap'>
                            {varient == "register" ? (
                                <>
                                    Already a Netflix user? <span onClick={() => toggleVarient()} className='text-white cursor-pointer hover:text-red-600 duration-100 font-semibold underline'> Login to an existing account</span>
                                </>

                            ) : (
                                <>
                                    First time using Netflix? <span onClick={() => toggleVarient()} className='text-white cursor-pointer hover:text-red-600 duration-100 font-semibold underline'> Create a new account</span>
                                </>
                            )
                            }</p>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
