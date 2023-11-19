class Forecast {
  constructor() {
    this.weatherURI = "https://api.open-meteo.com/v1/forecast"
    this.cityURI = "https://geocoding-api.open-meteo.com/v1/search"
  }
  async updateCity(city) {
    const cityDets = await this.getCity(city)
    const weather = await this.getWeather(cityDets.latitude, cityDets.longitude)
    return {
      cityDets,
      weather,
    }
  }
  async getCity(city) {
    const query = `?name=${city}`
    const response = await fetch(this.cityURI + query)
    const data = await response.json()
    return data.results[0]
  }
  async getWeather(lat, lon) {
    const query = `?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&forecast_days=1`

    const response = await fetch(this.weatherURI + query)
    const data = await response.json()
    return data
  }
}
