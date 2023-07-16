import React from "react";
import { BsFillBrightnessHighFill, BsCloudSunFill, BsCloudyFill, BsCloudsFill } from 'react-icons/bs';

function CloudIcons ({ cloudCover }) {

    let IconCloud = null;

    if (cloudCover < 25) {
        IconCloud = BsFillBrightnessHighFill;
    } else if (cloudCover >= 25 && cloudCover < 50) {
        IconCloud = BsCloudSunFill;
    } else if (cloudCover >= 50 && cloudCover < 75) {
        IconCloud = BsCloudyFill;
    } else {
        IconCloud = BsCloudsFill;
    }

    return (
        <>
            <IconCloud/>
        </>
    );
}

export default CloudIcons
