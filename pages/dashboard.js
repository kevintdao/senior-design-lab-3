import React from 'react'
import PrivateRoute from '../components/PrivateRoute';
import AllPolls from '../components/AllPolls';

export default function dashboard() {
    return PrivateRoute(
        <div className="container">
            <h2 className="mt-2">Dashboard</h2>
            <AllPolls />
        </div>
    )
}