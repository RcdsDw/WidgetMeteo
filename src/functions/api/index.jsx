async function SearchCity(city) {
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    if (response.ok) {
       return await response.json()
    } else {
        return false;
    }
}

async function SearchWeather(lat, long) {
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,cloudcover,is_day`)
    if (response.ok) {
       return await response.json()
    } else {
        return false;
    }
}

const api = {
    SearchCity,
    SearchWeather,
}

export default api