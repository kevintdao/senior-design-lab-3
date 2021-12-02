import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const bid = props.bid;
    const vps = props.vps;
    const vpu = props.vpu;
    const id = props.id;
    const votes = props.votes;
    
    function handleCheckbox(element, vps){
        var selected = document.querySelectorAll('input[type=checkbox]:checked');
        if( !(selected.length <= vpu) ){
            selected.forEach((s) => {
                s.checked = false;
            })
            alert("must only select " + vpu + "options");
        }
    }

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
            <h6 className="w-1/2">{formatTime(times.start)} to {formatTime(times.end)}</h6>
            <h6 className="w-1/4">{votes.length.toString()} / {vps}</h6>
            <h6 className="w-1/4">Name: {votes.join()}</h6>
        </div>
    )
}
