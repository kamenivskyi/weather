import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { ForecastDay, SelectedCity, WeatherCurrent } from '@/models';

export interface WeatherCardInterface {
  id: number;
  selectedRegime: 'day' | 'week';
  selectedCity: SelectedCity | null;
  currentWeather: WeatherCurrent | null;
  forecastWeather: ForecastDay[][] | null;
}

interface State {
  weatherCards: WeatherCardInterface[];
}

export const useHomeCardsStore = defineStore('homeCards', () => {
  const data = ref({
    cards: [
      {
        id: Math.random(),
        selectedRegime: 'day',
        selectedCity: null,
        currentWeather: null,
        forecastWeather: null
      }
    ] as WeatherCardInterface[],
    firstMount: true
  });

  const addWeatherCard = (newCard: WeatherCardInterface) => {
    data.value.cards.push(newCard);
  };

  const removeWeatherCard = (id: number) => {
    const index = data.value.cards.findIndex((card: WeatherCardInterface) => card.id === id);

    if (index !== -1) {
      data.value.cards.splice(index, 1);
    }
  };

  const setSelectedRegime = (id: number, regime: 'day' | 'week') => {
    const card = data.value.cards.find((card: WeatherCardInterface) => card.id === id);
    if (card) {
      card.selectedRegime = regime;
    }
  };

  const setCurrentWeather = (id: number, weather: WeatherCurrent | null) => {
    const card = data.value.cards.find((card: WeatherCardInterface) => card.id === id);
    if (card) {
      card.currentWeather = weather;
    }
  };

  const setSelectedCity = (id: number, city: SelectedCity | null) => {
    const card = data.value.cards.find((card: WeatherCardInterface) => card.id === id);
    if (card) {
      card.selectedCity = city;
    }
  };

  const setForecastWeather = (id: number, forecast: ForecastDay[][] | null) => {
    const card = data.value.cards.find((card: WeatherCardInterface) => card.id === id);
    if (card) {
      card.forecastWeather = forecast;
    }
  };

  const setFirstMount = (value: boolean) => (data.value.firstMount = value);

  return {
    addWeatherCard,
    removeWeatherCard,
    setSelectedRegime,
    setCurrentWeather,
    setSelectedCity,
    setForecastWeather,
    setFirstMount,
    data
  };
});
