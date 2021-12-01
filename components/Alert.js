import React from 'react'

export default function Alert(props) {
    const textColor = props.textColor ? props.textColor : 'text-red-700';
    const borderColor = props.borderColor ? props.borderColor : 'border-red-400';
    const bgColor = props.bgColor ? props.bgColor : 'bg-red-100';

    return (
        <div className={`border ${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded mt-2`} role='alert'>
            {props.text}
        </div>
    )
}
