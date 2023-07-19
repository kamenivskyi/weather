export interface WeatherCurrentResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}
export interface WeatherCurrent {
  coord: Coord
  main: Main
  wind: Wind
  timezone: number
  sunrise: string
  sunset: string
  temp: number
  tempMin: number
  tempMax: number
  iconUrl: string
  id: number
  name: string
  clouds: number
  country: string
  description: string
  visibility: number

}

export interface ForecastDay {
  dt_txt: string, 
  main: Main, 
  weather: Weather[], 
  wind: Wind, 
  clouds: Clouds,
  pressure: number,
}

export interface CityResponse {
  id: number
  city: string
  countryCode: string
  country: string
  latitude: number
  population: number
  longitude: number
}

export interface DropdownCity {
  id: number
  lat: number
  lon: number
  label: string
}

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}
