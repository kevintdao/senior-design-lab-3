import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext'
import Alert from './Alert'


export default function NavBar() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const router = useRouter();

    async function handleLogout(){
        setError('');

        try{
            await logout();
            router.push('/login');
        } catch{
            setError('Failed to log out');
        }
    }

    if(currentUser == null){
        return (
            <div className="shadow-md sticky top-0 z-50 bg-gray-800 ">
                <div className="container max-w-6xl lg:mx-auto p-1 pl-4 pr-4">
                    <div className="flex justify-between space-x-4">
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        </div>

                        <div className="flex space-x-4">
                            <a href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</a>
                            <a href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
                        </div>
                    </div>
                </div>

                <div>
                    {/* error alert */}
                    {error && <Alert text={error} />}
                </div>
            </div>
        )
    }

    return (
        <div className="shadow-md sticky top-0 z-50 bg-gray-800">
            <div className="container max-w-6xl lg:mx-auto p-1 pl-4 pr-4">
                <div className="flex justify-between space-x-4">
                    <div className="flex space-x-4">
                        <a href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                        <a href="/poll" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Poll</a>
                    </div>

                    <div className="flex space-x-4">
                        <div className="px-3 py-2 hidden sm:inline-block">
                            <p className="text-gray-300 text-sm font-medium"><strong>Logged in as:</strong> {currentUser && currentUser.email}</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    </div>
                </div>
            </div>

            <div>
                {/* error alert */}
                {error && <Alert text={error} />}
            </div>
        </div>
    )
}
