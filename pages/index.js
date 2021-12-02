import React from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';

export default function index() {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser == null) {
    router.push('/login');
    return (
      <div></div>
    )
  }

  else{
    router.push('/dashboard');
    return (
      <div></div>
    )
  }
}
