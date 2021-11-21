import React from 'react'
import { useAuth } from '../AuthContext'

export default function NavBar() {
    const { currentUser } = useAuth();

    function logout(){

    }

    return (
        <div className="w-full">
            <nav className="bg-gray-800 p-1">
                <div className="flex space-x-4">
                    <a href="/home" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="/polls" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Polls</a>
                    
                    <a href="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</a>
                    <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</a>
                </div>
            </nav>
        </div>
    )
}
