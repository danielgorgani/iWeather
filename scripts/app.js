const cityForm = document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const time = document.querySelector("img.time")
const icon = document.querySelector(".icon img")
const loading = document.querySelector(".loader")
const forecast = new Forecast()

const updateUI = (data) => {
  const { cityDets, weather } = data

  let code = weather.current.weather_code
  const weatherText = () => {
    let text = ""
    let icon = ""
    switch (code) {
      case 0:
        text = "Clear Sky"
        icon = "clear"
        break
      case 1:
        text = "Mainly Clear"
        icon = "mainly-clear"
        break
      case 2:
        text = "Partly Cloudy"
        icon = "mainly-clear"
        break
      case 3:
        text = "Overcast"
        icon = "mainly-clear"
        break
      case 45 || 48:
        text = "Fog"
        icon = "fog"
        break
      case 51 || 53 || 55:
        text = "Drizzle"
        icon = "drizzle"
        break
      case 56 || 57:
        text = "Freezing Drizzle"
        icon = "drizzle"
        break
      case 61 || 63 || 65:
        text = "Rain"
        icon = "rainy"
        break
      case 66 || 67:
        text = "Freezing Rain"
        icon = "rainy"
        break
      case 71 || 73 || 75:
        text = "Snow Fall"
        icon = "snow"
        break
      case 77:
        text = "Snow Grains"
        icon = "snow"
        break
      case 80 || 81 || 82:
        text = "Rain Shower"
        icon = "rainy"
        break
      case 85 || 86:
        text = "Snow Shower"
        icon = "snow"
        break
      case 95 || 96 || 99:
        text = "Thunderstorm"
        icon = "lightning"
        break
      default:
        text = "Clear Sky"
        icon = "clear"
        break
    }
    return {
      text,
      icon,
    }
  }

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.name}</h5>
    <div class="my-3">${weatherText().text}</div>
    <div class="display-4 my-4">
        <span>${weather.current.temperature_2m}</span>
        <span>&deg;C</span>
    </div>
    `

  const iconSrc = `img/icons/${weatherText().icon}.svg`
  icon.setAttribute("src", iconSrc)

  let timeSrc = weather.current.is_day ? "img/day.svg" : "img/night.svg"

  time.setAttribute("src", timeSrc)

  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none")
  }
  loading.classList.add("d-none")
}

cityForm.addEventListener("submit", (e) => {
  e.preventDefault()
  loading.classList.remove("d-none")
  card.classList.add("d-none")

  // get city
  const city = cityForm.city.value.trim()
  cityForm.reset()

  // update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))

  // set local storage
  localStorage.setItem("city", city)
})

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))
}
