import React from 'react'
import PrivateRoute from '../../components/PrivateRoute'

export default function create() {
    return PrivateRoute(
        <div>
            Create Poll Page
        </div>
    )
}
