import React from 'react'

export default function Alert(props) {
    return (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded' role='alert'>
            {props.text}
        </div>
    )
}
