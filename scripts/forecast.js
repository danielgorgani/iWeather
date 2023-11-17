// get weather information
const getWeather = async (lat, lon) => {
  const base = "https://api.open-meteo.com/v1/forecast"
  const query = `?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&forecast_days=1`

  const response = await fetch(base + query)
  const data = await response.json()
  return data
}

// get city information
const getCity = async (city) => {
  const base = "https://geocoding-api.open-meteo.com/v1/search"
  const query = `?name=${city}`

  const response = await fetch(base + query)
  const data = await response.json()

  return data.results[0]
}
