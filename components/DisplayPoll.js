import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {
    //const blocks = props.blocks.data.blocks;
    const blocks = props.blocks[0].data.blocks;
    const vps = props.vps;
    const vpu = props.vpu;
    const id = props.blocks[0].id;
    console.log(id);
    return (
        <div>
            {blocks.map((block, i) => {
                // const id = block.id;
                //const data = block.data;

                const blockDate = block.end.toDate().toString().split(" ");
                const blockDateStart = block.start.toDate().toString().split(" ");
                const times = {"end": blockDate[4], "start": blockDateStart[4]}
                //console.log(times);
                //const times = data.time;
                //return <PollBlock key={i} id={id} times={times} vps={vps} vpu={vpu}/>
                // return <PollBlock key={i} id={id} date={blockDate} times={times} vps={vps} vpu={vpu}/>
                return <PollBlock key={i} id={id} date={blockDate} times={times} vps={vps} vpu={vpu}/>
            })}
        </div>
    )
}
