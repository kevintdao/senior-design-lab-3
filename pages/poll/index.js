import React from 'react'
import PrivateRoute from '../../components/PrivateRoute'

export default function index() {
    return PrivateRoute(
        <div>
            Poll Index Page
        </div>
    )
}
