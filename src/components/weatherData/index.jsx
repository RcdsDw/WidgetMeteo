import React from "react";
import styled from "styled-components"
import { format } from 'date-fns/esm';
import "../../styles/style.css"
import Night from '../../assets/night.jpg'
import Day from '../../assets/day.jpg'
import { WiHumidity } from 'react-icons/wi';
import CloudIcons from "../../functions/icons/cloudIcon";
import PrecipitationIcons from "../../functions/icons/precipitationIcon";
import TemperatureIcons from "../../functions/icons/temperatureIcon";

const WeatherContainer = styled.div `

`

const WeatherWrapper = styled.div `
    display: flex;
    flex-direction: column;
    margin-top: -70px;
`

const WeatherComponent = styled.p `
    height: auto;
    width: 220px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: large;
    padding: 15px;
    border: 2px solid rgba(0, 0, 0, 0.8);
    border-radius: 25px;
    transition: 0.7s ease-in-out;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.9);
    &:hover {
        scale: 1.1;
        background-color: rgba(170, 170, 170, 0.5);
    }
`

const WeatherResponseIcon = styled.div`
    display: flex;
    flex-direction: row;
`

function Weather({ weatherDatas }) {

    let mergedData = [];

    if (weatherDatas) {
        
        const { time, temperature_2m, relativehumidity_2m, precipitation_probability, cloudcover, is_day} = weatherDatas.hourly;
        
        /* Je fais un ".map" sur time pour récupérer les infos correspondantes à l'index de time */

        mergedData = time.map((element, index) => {
            const formattedDate = format(new Date(element), 'dd/MM/yyyy HH'); /* Je convertis ma date qui est au format iso 8601 en objet Date pour modifier le format de la date en suivant. Pour convertir la date dans un autre format, j'ai installé la bibliothèque date-fns */

            return {
                date: formattedDate,
                temperature: temperature_2m[index],
                humidity: relativehumidity_2m[index],
                precipitationProbability: precipitation_probability[index],
                cloudCover: cloudcover[index],
                isDay: is_day[index]
            };
        });
    };
    const currentDate = new Date();
    const currentDateStr = format(currentDate, 'dd/MM/yyyy HH');
    mergedData = mergedData.find(element => element.date === currentDateStr); /* Va chercher la date de l'élément qui correspond à la date actuelle*/
    
    const bodyElem = document.getElementById('app-body')

    if (mergedData.isDay === 1) {
        bodyElem.style.backgroundImage = `url("${Day}")`
        bodyElem.style.color = 'rgba(24, 24, 24, 0.8)'
    } else {
        bodyElem.style.backgroundImage = `url("${Night}")`
        bodyElem.style.color = 'rgba(255, 255, 255, 0.8)'
    }    

    return (
        
        <WeatherContainer>
            {mergedData &&
            <WeatherWrapper id="weatherWrapper">
                <WeatherComponent id="temperature">
                    <span>Température</span>
                    <WeatherResponseIcon>
                        {mergedData.temperature}{weatherDatas.hourly_units.temperature_2m}    <TemperatureIcons temperature={mergedData.temperature}/>
                    </WeatherResponseIcon>
                </WeatherComponent><br/>
                <WeatherComponent id="humidity">
                    <span>Taux d'Humidité</span>
                    <WeatherResponseIcon>
                        {mergedData.humidity}<WiHumidity/>
                    </WeatherResponseIcon>
                </WeatherComponent><br/>
                <WeatherComponent id="precipitation">
                    <span>Probabilité de précipitation</span>
                    <WeatherResponseIcon>
                        {mergedData.precipitationProbability}{weatherDatas.hourly_units.precipitation_probability}    <PrecipitationIcons precipitationProbability={mergedData.precipitationProbability}/>
                    </WeatherResponseIcon>
                </WeatherComponent><br/>
                <WeatherComponent id="cloud">
                    <span>Couverture des nuages</span>
                    <WeatherResponseIcon>
                        {mergedData.cloudCover}{weatherDatas.hourly_units.cloudcover}    <CloudIcons cloudCover={mergedData.cloudCover}/>
                    </WeatherResponseIcon>
                </WeatherComponent>
            </WeatherWrapper>
            }
        </WeatherContainer>
        
    )
}

export default Weather

