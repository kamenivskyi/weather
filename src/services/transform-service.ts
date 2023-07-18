import { convertToTime } from "@/utils";
import { apiService } from "./api-service";
import type { WeatherCurrent, WeatherCurrentResponse } from "@/models";

export const transformService = {
  simplifyCurrent(obj: WeatherCurrentResponse): WeatherCurrent {
    return {
      id: obj.id,
      coord: obj.coord,
      main: obj.main,
      name: obj.name,
      clouds: obj.clouds.all,
      country: obj.sys.country,
      description: obj.weather[0].description,
      visibility: obj.visibility,
      wind: obj.wind,
      timezone: obj.timezone,
      sunrise: convertToTime(obj.sys.sunrise),
      sunset: convertToTime(obj.sys.sunset),
      temp: Math.round(obj.main.temp),
      tempMin: Math.round(obj.main.temp_min),
      tempMax: Math.round(obj.main.temp_max),
      iconUrl: apiService.getIconUrl(obj.weather[0].icon),
    };
  }
};