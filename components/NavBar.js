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
            router.push('/');
        } catch{
            setError('Failed to log out');
        }
    }

    return (
        <div className="w-full">
            <nav className="bg-gray-800 p-1">
                {/* error alert */}
                {error && <Alert text={error} />}

                <div className="flex space-x-4">
                    <div className="flex space-x-4">
                        <a href="/home" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="/poll" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Poll</a>
                    </div>

                    <div className="flex space-x-4">
                        <div className="px-3 py-2">
                            <p className="text-gray-300 text-sm font-medium"><strong>Logged in as:</strong> {currentUser && currentUser.email}</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
