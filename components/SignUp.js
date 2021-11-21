import React, { useRef, useState } from 'react'
import { useAuth } from '../AuthContext'
import Alert from './Alert'
import NavBar from './NavBar';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        if(passwordRef.current.value.length < 6){
            return setError('Password should be at least 6 characters')
        }

        try{
            setError('')
            // prevent user from creating multiple accounts by clicking signup button repeatedly
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false)
    }

    return (
        <div>
            <NavBar />
            <form action="#" method="POST" onSubmit={handleSubmit} className="flex items-center justify-center min-h-screen py-2">
                <div className="w-1/2 max-w-md space-y-4 p-4 rounded-md bg-white shadow-sm border border-gray-100">
                    <h2 className="text-center font-bold mb-5">Create an account</h2>

                    {/* error alert */}
                    {error && <Alert text={error} />}

                    <div className="flex flex-col">
                        <label htmlFor="login">Email:</label>
                        <input type="text" id="email" name="email" ref={emailRef} className="border border-gray-300 rounded p-2"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="pass">Password:</label>
                        <input type="password" id="pass" name="pass" ref={passwordRef} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirm-pass">Confirm Password:</label>
                        <input type="password" id="confirm-pass" name="confirm-pass" ref={passwordConfirmRef} className="border border-gray-300 rounded p-2"/>
                    </div>

                    <div>
                        <button disabled={loading} className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 p-2">Sign Up</button>
                    </div>

                    <div>
                        <a href="/" className="flex justify-center hover:text-blue-500">Already have an account?</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
