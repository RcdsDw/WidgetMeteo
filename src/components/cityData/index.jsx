import React, { useState, useEffect } from "react";
import styled from "styled-components"
import api from "../../functions/api/index"
import Weather from "../weatherData"
import "../../styles/style.css"
import { RxCross2 } from "react-icons/rx"

const InfoContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SearchInput = styled.input `
    position: fixed;
    height: 45px;
    width: 310px;
    border-radius: 15px;
    background: none;
    font-size: xx-large;
    padding-left: 15px;
    margin: 5px 0px 0px 0px;
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.3);
    color: rgba(24, 24, 24, 0.8);
`

const DeleteText = styled.button`
    z-index: 2;
    position: relative;
    top: 10px;
    left: 3.5em;
    font-size: 40px;
    border: none;
    background: none;
    color: rgba(24, 24, 24, 0.8);
    transition: color 0.6s;
    &:hover {
        color: red;
    }
`

const CityWrapper = styled.div `
    display: flex; 
    position: fixed;
    top: 70px;
    padding: 0px;
    cursor: none;
`

const CityComponent = styled.div `
`

const CityFlag = styled.img `
    position: relative;
    top: -48%;
    left: 10px; 
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
        
const CityInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    alignt-items: center;
    transition: 1s ease-in-out;
`

const CityName = styled.div`
    margin-top: 30px;
    font-size: 50px;
`

const CityFlag2 = styled.img`
    position: absolute;
    bottom: 5px;
`

const WeatherInfoWrapper = styled.div`
    margin-top: 100px;
`

const CityCountry = styled.div`
    position: absolute;
    top: 4em;
    right: 0;
    transform: rotate(180deg);
    writing-mode: tb-rl;
    font-size: 60px;
`

function City({defaultCity = ""}) {

    const [city, setCity] = useState(defaultCity); 
    const [citiesData, setCitiesData] = useState(null);
    const [error, setError] = useState("");
    const [weatherDatas, setWeatherDatas] = useState(null);

    function handleSearch(e) {
        const {value} = e.target
        setCity(value)      
    }

    /* Écoute les changements de "city" et va chercher les données de la ville */

    useEffect(() => {
        async function fetchData (){
            if(city.length >= 1) {
                let response = await api.SearchCity(city)
                setError("") 
                if (response === false) {
                    setError("Whoops, cette ville n'existe pas...")
                } else if (response.results) {
                        setCitiesData(response.results[0]);
                } else {
                    setCitiesData(null);
                    setWeatherDatas(null)
                }
            }
        }
        fetchData(); 
    }, [city]) 
    
    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            if (citiesData) {
                fetchWeather(citiesData);
            }
        }
    }

    function handleDeleteText(){
        if(city && citiesData) {
            setCity("")
            setCitiesData(null)
        }
    }

    /* Cette fonction va chercher les infos météo en fonction du nom de la ville en paramètre */
            
    async function fetchWeather(selectedCity) {
        if (selectedCity) {
            const longitude = selectedCity.longitude
            const latitude = selectedCity.latitude
    
            let response = await api.SearchWeather(latitude, longitude)
            setError("") 
            if (response === false) {
                setError("Whoops, on n'a pas trouvé la météo...")
            } else {
                setWeatherDatas(response);
                setCity("")
            } 
        }
    }

    return (
        <InfoContainer>
            
            <SearchInput 
                type="text" 
                id="search" 
                name="search" 
                placeholder="Trouvez votre ville" 
                onChange={handleSearch} 
                onKeyDown={handleKeyPress} 
                value={city} 
                error={error}
            />
            <DeleteText onClick={handleDeleteText}><RxCross2/></DeleteText>

            {citiesData && weatherDatas === null &&
                <CityWrapper>
                    <CityComponent>{citiesData.name}, </CityComponent>
                    <CityComponent>{citiesData.admin1}, </CityComponent>
                    <CityComponent>{citiesData.country}</CityComponent>
                    <CityFlag src={`https://hatscripts.github.io/circle-flags/flags/${citiesData.country_code.toLowerCase()}.svg`} width="24"></CityFlag>
                </CityWrapper>
            }

           {weatherDatas && 
            <InfoWrapper>
                <CityInfoWrapper>
                    <CityName id="name" >{citiesData.name}</CityName>
                    <CityFlag2 id="flag" src={`https://hatscripts.github.io/circle-flags/flags/${citiesData.country_code.toLowerCase()}.svg`} width="50"></CityFlag2>
                </CityInfoWrapper>
                <WeatherInfoWrapper>
                    <Weather weatherDatas={weatherDatas}/>
                </WeatherInfoWrapper>
                <CityCountry id="country" >{citiesData.country}</CityCountry>
            </InfoWrapper>
            }
        </InfoContainer>
    )
}

export default City