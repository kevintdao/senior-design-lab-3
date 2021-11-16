import React, { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from './utils/firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        // set current user
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])
    

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
