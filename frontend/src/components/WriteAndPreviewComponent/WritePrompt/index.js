import React from 'react';
import { Prompts } from '../../../constants';

const WritePrompt = ({ month, currentTime }) => {
    const day = currentTime.getDate();
    const hours = currentTime.getHours();

    let timePrompt = "";
    if (hours >= 0 && hours < 12) {
        timePrompt = "Good morning!";
    } else if (hours >= 12 && hours < 18) {
        timePrompt = "Good afternoon!";
    } else {
        timePrompt = "Good evening!";
    }

    let monthPrompts = Prompts[month];
    let prompt = monthPrompts[day] || monthPrompts.DEFAULT;

    return <>
        <div style={{ color: "gray" }}>
            {timePrompt} {prompt}
        </div>
    </>
}

export default WritePrompt;