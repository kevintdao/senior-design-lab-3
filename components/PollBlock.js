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
    
    return (
        
        <div id={id} className="flex items-center">
            <h6>{day} {month} {date} {year} {times.start} to {times.end}</h6>
            {/* <input type="checkbox" id={`${id}_${month}-${date}-${times.start}`} className="mr-2" onChange={(e) => handleCheckbox(e.target, vps)}/> */}
            <input type="checkbox" id={`${id}_${bid}`} className="mr-2" disabled={votes.length >= vps} onChange={(e) => handleCheckbox(e.target, vps)} />
            <h6>{votes.length.toString()} / {vps} slots taken </h6>
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
