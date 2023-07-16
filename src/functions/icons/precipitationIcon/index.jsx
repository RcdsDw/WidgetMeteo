import React from "react";
import { BsCloudyFill, BsFillCloudRainFill, BsFillCloudRainHeavyFill } from 'react-icons/bs';

function PrecipitationIcons ({ precipitationProbability }) {

    let IconPrecipitation = null;

    if (precipitationProbability < 33) {
        IconPrecipitation = BsCloudyFill;
    } else if (precipitationProbability >= 33 && precipitationProbability < 66) {
        IconPrecipitation = BsFillCloudRainFill;
    } else {
        IconPrecipitation = BsFillCloudRainHeavyFill;
    }

    return (
        <>
            <IconPrecipitation/>
        </>
    );
}

export default PrecipitationIcons
