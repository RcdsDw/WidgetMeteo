import React from "react";
import { FaTemperatureEmpty, FaTemperatureQuarter, FaTemperatureHalf, FaTemperatureThreeQuarters, FaTemperatureFull } from 'react-icons/fa6';

function TemperatureIcons ({ temperature }) {

    let IconTemperature = null;

    if (temperature < 0) {
        IconTemperature = FaTemperatureEmpty;
    } else if (temperature >= 0 && temperature < 10) {
        IconTemperature = FaTemperatureQuarter;
    } else if (temperature >= 10 && temperature < 20) {
        IconTemperature = FaTemperatureHalf;
    } else if (temperature >= 20 && temperature < 30) {
        IconTemperature = FaTemperatureThreeQuarters;
    } else {
        IconTemperature = FaTemperatureFull;
    }

    return (
        <>
            <IconTemperature/>
        </>
    );
}

export default TemperatureIcons