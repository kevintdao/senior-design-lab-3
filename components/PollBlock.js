import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const bid = props.bid;
    const vps = props.vps;
    const vpu = props.vpu;
    const id = props.id;
    const votes = props.votes;
    var selectedId = [];
    var numSelectedSlots = 0;
    // for(let time in times){
    //     console.log(time);
    // }

    // vps_arr = []
    // for(let i = 0; i < vps; i++){
    //     vps_arr.push(0);
    // }

    // function handleCheckbox(element, vps){
    //     // TODO: Check for valid number of checkboxes
    //     var checkboxes = document.querySelectorAll('input[type=checkbox]:not([disabled])');
    //     var selected = document.querySelectorAll('input[type=checkbox]:checked');
    //     console.log(selectedId);

    //     if(selected.length <= vps && !selectedId.includes(element.id)){
    //         selectedId.push(element.id);
    //         return;
    //     }

    //     selectedId.shift();
    //     checkboxes.forEach((checkbox) => {
    //         if(!selectedId.includes(checkbox.id) && checkbox.checked && checkbox != element ){
    //             checkbox.checked = false;
    //         }
    //     })
    // }
    function handleCheckbox(element, vps){
        console.log(element);
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
            <input type="checkbox" id={`${id}_${bid}`} className="mr-2" disabled={votes.length == vps} onChange={(e) => handleCheckbox(e.target, vps)} />
            <h6>{votes.length.toString()} / {vps} slots taken </h6>
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
