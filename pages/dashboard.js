import React from 'react'
import PrivateRoute from '../components/PrivateRoute';
import AllPolls from '../components/AllPolls';

export default function dashboard() {
    return PrivateRoute(
        <div>
            <div className="bg-white shadow">
                <h1 className="text-4xl font-bold text-gray-900 py-3 container max-w-6xl lg:mx-auto">Dashboard</h1>
            </div>
            <div className="container max-w-4xl lg:mx-auto">
                <AllPolls />
            </div>
        </div>
    )
}