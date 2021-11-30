import React, { useRef } from 'react'

export default function PollTime(props) {
    const index = props.index;

    return (
        <div className="flex md:flex-row md:space-x-2 justify-between flex-col">
            <div className="flex flex-col w-full">
                <label htmlFor="date">Date*</label>
                <input type="date" id={`date-${index}`} name="date" className="border border-gray-300 rounded p-2" />
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="start">Start Time*</label>
                <input type="time" id={`start-${index}`} name="start" className="border border-gray-300 rounded p-2" />
            </div>
            
            <div className="flex flex-col w-full">
                <label htmlFor="end">End Time*</label>
                <input type="time" id={`end-${index}`} name="end" className="border border-gray-300 rounded p-2" />
            </div>
        </div>
    )
}
