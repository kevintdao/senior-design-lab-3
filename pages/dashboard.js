import React from 'react'
import PrivateRoute from '../components/PrivateRoute';

export default function dashboard() {
    return PrivateRoute(
        <div>
            Dashboard
        </div>
    )
}