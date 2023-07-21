import type { ForecastDay } from '@/models';
import { addDays, isSameDay, getDay } from 'date-fns';

interface GeolocationCoords {
  latitude: number, 
  longitude: number
}

export const sortByEachDay = (data: ForecastDay[]) => {
  // console.log('getDay: ', getDay(new Date(data[0].dt_txt)));
  let allDays = [];
  let currentDay = new Date(data[0].dt_txt.split(' ')[0]);
  const filterDay = (item: any) => isSameDay(new Date(item.dt_txt.split(' ')[0]), currentDay);

  for (let i = 0; i < 5; i++) {
    let singleDay = data.filter(filterDay);

    allDays.push(singleDay);
    currentDay = addDays(new Date(currentDay), 1);
  }

  return allDays;
};

export const getGeolocation = (): Promise<GeolocationCoords> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
};


export const convertToTime = (value: number) => {
  console.log('convertTime val: ', value);

  const date = new Date(value * 1000);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const time = `${hours}:${minutes}`;

  return time;
};

const addZero = (value: any) => {
  console.log('val: ', value);
  if (value.toString().length < 2) {
    value = '0' + value;
  }
  return value;
};

export const getHours = (date: string) => {
  let hours = new Date(date).getHours().toString();

  if (hours.length < 2) {
    hours = '0' + hours;
  }
  return hours + ':00';
};
