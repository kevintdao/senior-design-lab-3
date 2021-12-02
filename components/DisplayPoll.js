import React from 'react'
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {

    const blocks = props.blocks;
    const vps = props.vps;
    const vpu = props.vpu;

    return (
        <div id='poll-block'>
            {blocks.map((block) => {
                const id = block.id;

                return block.data.blocks.map((b, i) => {
                    const blockDateEnd = b.end.toDate().toString().split(" ");
                    const blockDateStart = b.start.toDate().toString().split(" ");
                    const times = {"end": blockDateEnd[4], "start": blockDateStart[4]};
                    console.log(block.data.votes[i]);
                    return <PollBlock key={i} bid={i} id={id} date={blockDateEnd} times={times} vps={vps} vpu={vpu} votes ={block.data.votes[i]}/>
                });
                
            })}
        </div>
    )
}