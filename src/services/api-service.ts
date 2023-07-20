import axios from 'axios';
import { transformService } from './transform-service';
import type { CityResponse, ForecastDay, WeatherCurrent } from '@/models';

export const apiService = {
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'e6bc569497f75fdbd9c1b2e6a2537e83',
  IMAGE_PREFIX: 'http://openweathermap.org/img/wn/',

  CITIES_BASE_URL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  CITIES_OPTIONS: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8605488dc1mshb59ac8f51883051p151cdfjsnb38dc6184d3e',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  },

  STATUS: {
    ok: 200
  },

  async getCities(name: string): Promise<CityResponse[] | any> {
    const MIN_POPULATION = '50000';
    try {
      const { data } = await axios.request({
        ...this.CITIES_OPTIONS,
        url: `${this.CITIES_BASE_URL}/cities?minPopulation=${MIN_POPULATION}&namePrefix=${name}`
      });
      console.log('cities: ', data.data);

      return data.data?.length ? data.data.map(transformService.simplifyCity) : data.data;
    } catch (error: unknown) {
      console.error(error);
    }
  },

  async getWeatherResource(url: string): Promise<any> {
    const res = await axios
      .create({
        baseURL: this.WEATHER_BASE_URL
      })
      .get(`${url}&mode=json&units=metric&appid=${this.API_KEY}`)
      .catch((error: unknown) => {
        console.error(error);
      });

    if (res && res?.status === this.STATUS.ok) {
      return res.data;
    }
    return null;
  },

  async getCurrent(lat: number, lon: number): Promise<WeatherCurrent> {
    const res = await this.getWeatherResource(`/weather?lat=${lat}&lon=${lon}`);
    return transformService.simplifyCurrent(res);
  },

  async getForecast(lat: number, lon: number): Promise<ForecastDay[][]> {
    const res = await this.getWeatherResource(`/forecast?lat=${lat}&lon=${lon}`);
    // console.log('api forecast: ', res)

    return res?.list ? transformService.transformForecastArray(res.list) : { list: [] };
  },

  async getWeather(lat: number, lon: number) {
    // apiService.getCurrent(lat, lon);
    return Promise.all([this.getCurrent(lat, lon), this.getForecast(lat, lon)])

  },

  getIconUrl(iconCode: string) {
    return `${this.IMAGE_PREFIX}/${iconCode}@2x.png`;
  }
};
