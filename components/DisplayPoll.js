import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {
    //const blocks = props.blocks.data.blocks;
    const blocks = props.blocks[0].data.blocks;
    console.log("blocks");
    console.log(blocks);
    const vps = props.vps;
    const vpu = props.vpu;

    return (
        <div>
            {blocks.map((block, i) => {
                const id = block.id;
                //const data = block.data;

                //const blockDate = data.date.toDate().toString().split(" ");
                console.log("Display");
                //console.log(data);
                const blockDate = block.end.toDate().toString().split(" ");
                //const times = data.time;
                //return <PollBlock key={i} id={id} times={times} vps={vps} vpu={vpu}/>
                return <PollBlock key={i} id={id} date={blockDate} times={times} vps={vps} vpu={vpu}/>
            })}
        </div>
    )
}
