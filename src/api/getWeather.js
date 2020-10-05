const API_KEY = '0a4ca624b3b6caa5a76be2d1c36ef77d'

export async function getCityByName(query) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
    let data = await response.json()
    const city = {
      coord: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      name: data.name,
      country: data.sys.country,
      id: data.id
    };
    return city
  } catch (error) {
    console.log(error);
    return false
  }
}
export async function getWeatherById(id) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`)
    let data = await response.json()
    return data
  } catch (error) {
    return false
  }
}

export async function getForecastById(id) {
  try {
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&cnt=8&appid=${API_KEY}&units=metric`)
    let data = await response.json()
    return data
  } catch (error) {
    return false
  }
}

