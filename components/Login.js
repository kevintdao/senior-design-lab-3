import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../AuthContext'
import Alert from './Alert'
import NavBar from './NavBar'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            router.push('/dashboard')
        } catch {
            setError('Failed to login');
        }
        setLoading(false)
    }

    return (
        <div>
            <form action="#" method="POST" onSubmit={handleSubmit} className="flex items-center justify-center min-h-screen py-2">
                <div className="w-1/2 max-w-md space-y-4 p-4 rounded-md bg-white shadow-sm border border-gray-100">
                    <h2 className="text-center font-bold mb-5">Sign In</h2>

                    {/* error alert */}
                    {error && <Alert text={error} />}

                    <div className="flex flex-col">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" ref={emailRef} className="border border-gray-300 rounded p-2"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" ref={passwordRef} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div>
                        <button className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700">Login</button>
                    </div>

                    <div>
                        <a href="/register" className="flex justify-center hover:text-blue-500">Don't have an account?</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
