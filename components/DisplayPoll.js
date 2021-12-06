import React from 'react';
import PollBlock from './PollBlock';

export default function DisplayPoll(props) {

    const blocks = props.blocks;
    const vps = props.vps;
    const vpu = props.vpu;
    const date = blocks[0].data.blocks[0].start.toDate().toString().split(" ");
//
    return (
        <div id='poll-block'>
            <div>
                <hr className="mt-2 mb-2"/>
                <h4 className="mt-2 mb-2">
                    {date[0]} {date[1]} {date[2]} {date[3]}
                </h4>
            </div>

            {blocks.map((block) => {
                const id = block.id;
                return block.data.blocks.map((b, i) => {
                    const blockDateEnd = b.end.toDate().toString().split(" ");
                    const blockDateStart = b.start.toDate().toString().split(" ");
                    const times = {"end": blockDateEnd[4], "start": blockDateStart[4]};
                    return <PollBlock key={i} bid={i} id={id} date={blockDateEnd} times={times} vps={vps} vpu={vpu} votes ={block.data.votes[i]}/>
                });  
            })}
            <hr className="mt-2 mb-2"/>
        </div>
    )
}