import React from 'react'
import Image from 'next/image'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const bid = props.bid;
    const vps = props.vps;
    const vpu = props.vpu;
    const id = props.id;
    const votes = props.votes;
    // 
    //
    function handleCheckbox(element, vps){
        var selected = document.querySelectorAll('input[type=checkbox]:checked');

        if( !(selected.length <= vpu) ){
            selected.forEach((s) => {
                s.checked = false;
            })
            alert("You can only select " + vpu + " option(s)!");
        }
    }
    //
    function formatTime(time){
        const [h, m] = time.split(':')
        
        const hour = h < 12 ? h : h - 12;
        hour = hour == 0 ? 12 : hour
        const min = m
        const ampm = h < 12 ? "AM" : "PM"

        return `${hour}:${min} ${ampm}`;
    }
    
    return (
        <div id={id} className="flex items-center">
            <input type="checkbox" id={`${id}_${bid}`} className="mr-2" disabled={votes.length >= vps} onChange={(e) => handleCheckbox(e.target, vps)} />
            <label htmlFor={`${id}_${bid}`} className="w-1/3">{formatTime(times.start)} to {formatTime(times.end)}</label>
            <div className="w-1/4 text-center flex flex-row space-x-2 align-center">
                <Image src='/graphics/check mark transparent.png' width="20px" height='20px' />
                <p>{votes.length.toString()} / {vps}</p>
            </div>
            <p className="w-6/12">Participants: <strong>{votes.join().replaceAll(',', ' / ')}</strong></p>
        </div>
    )
}
