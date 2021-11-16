import React from 'react'

export default function SignUp() {


    return (
        <div>
            <form action="#" method="POST" className="flex items-center justify-center min-h-screen py-2">
                <div className="w-1/2 max-w-md space-y-4 p-4 rounded-md bg-white shadow-sm border border-gray-100">
                    <h2 className="text-center font-bold mb-5">Create an account</h2>
                    
                    <div className="flex flex-col">
                        <label htmlFor="login">Email:</label>
                        <input type="text" id="email" name="email" className="border border-gray-300 rounded"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="pass">Password:</label>
                        <input type="password" id="pass" name="pass" className="border border-gray-300 rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirm-pass">Confirm Password:</label>
                        <input type="password" id="confirm-pass" name="confirm-pass" className="border border-gray-300 rounded"/>
                    </div>

                    <div>
                        <button className="h-8 w-full mt-4 rounded-md flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700">Sign Up</button>
                    </div>

                    <div>
                        <a href="/" className="flex justify-center hover:text-blue-500">Already have an account?</a>
                    </div>

                </div>
            </form>
        </div>
    )
}
