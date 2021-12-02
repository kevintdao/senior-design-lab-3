import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const vps = props.vps;
    const vpu = props.vpu;
    const id = props.id;
    var selectedId = [];

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
    return (
        
        <div id={id} className="flex items-center">
            <h6>{day} {month} {date} {year} {times.start} to {times.end}</h6>
            {/* <input type="checkbox" id={`${id}_${month}-${date}-${times.start}`} className="mr-2" onChange={(e) => handleCheckbox(e.target, vps)}/> */}
            <input type="checkbox" id={id} className="mr-2"/>
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
