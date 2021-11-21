import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext'

export default function PrivateRoute(props) {
    const { currentUser } = useAuth();
    const router = useRouter();

    if (currentUser == null) {
        router.push('/login');
    }

    return (
        {...props}
    )
}
