import React from 'react'
import { format } from '../utils/validation';

export default function PollTime(props) {
    const index = props.index;

    const date = null;
    const startTime = null;
    const endTime = null;

    if(props.block != undefined){
        const block = props.block.data.blocks;

        const start = block[0].start.toDate();
        const end = block[block.length - 1].end.toDate();
    
        date = `${start.getFullYear()}-${start.getMonth()+1}-${format(start.getDate())}`;
        startTime = `${format(start.getHours())}:${format(start.getMinutes())}`;
        endTime = `${format(end.getHours())}:${format(end.getMinutes())}`
    }

    return (
        <div id={`block-${index}`} className="flex md:flex-row md:space-x-2 justify-between flex-col">
            <div className="flex flex-col w-full">
                <label htmlFor="date">Date*</label>
                <input type="date" id={`date-${index}`} name="date" defaultValue={date} className="border border-gray-300 rounded p-2" />
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="start">Start Time*</label>
                <input type="time" id={`start-${index}`} name="start" defaultValue={startTime} className="border border-gray-300 rounded p-2" />
            </div>
            
            <div className="flex flex-col w-full">
                <label htmlFor="end">End Time*</label>
                <input type="time" id={`end-${index}`} name="end" defaultValue={endTime} className="border border-gray-300 rounded p-2" />
            </div>
        </div>
    )
}
