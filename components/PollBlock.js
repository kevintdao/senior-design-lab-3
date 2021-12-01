import React from 'react'

export default function PollBlock(props) {
    const [day, month, date, year] = props.date;
    const times = props.times;
    const vps = props.vps;
    const id = props.id;
    var selectedId = [];

    for(let time in times){
        console.log(time);
    }

    function handleCheckbox(element, vps){
        // TODO: Check for valid number of checkboxes
        var checkboxes = document.querySelectorAll('input[type=checkbox]:not([disabled])');
        var selected = document.querySelectorAll('input[type=checkbox]:checked');
        console.log(selectedId);

        if(selected.length <= vps && !selectedId.includes(element.id)){
            selectedId.push(element.id);
            return;
        }

        selectedId.shift();
        checkboxes.forEach((checkbox) => {
            if(!selectedId.includes(checkbox.id) && checkbox.checked && checkbox != element ){
                checkbox.checked = false;
            }
        })
    }

    return (
        <div id={id}>
            <h6>{day} {month} {date} {year}</h6>
            {/* {times.map((time, i) => {
                return <div id={`${id}_${i}`} className="flex items-center" key={i}>
                    <input id={`${id}_${month}-${date}-${time}`} type="checkbox" className="mr-2" disabled={pollTimes[i] == vps} onChange={(e) => handleCheckbox(e.target, vps)}/>
                    <p className="w-1/4">{time}</p>
                    <p>({pollTimes[i]} / {vps})</p>
                </div>
            })} */}
            <hr className="mb-1 mt-1"/>
        </div>
    )
}
