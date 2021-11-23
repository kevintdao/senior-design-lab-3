import React from 'react'
import { useRouter } from 'next/router'

export default function edit() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            {id}
        </div>
    )
}
