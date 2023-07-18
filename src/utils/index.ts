export const convertToTime = (value) => {
  console.log('value2: ', value);
  const date = new Date(value * 1000);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const time = `${hours}:${minutes}`;

  return time;
};


const addZero = (value: any) => {
  console.log('val: ', value);
  if (value.toString().length < 2) {
    value = "0" + value;
  }
  return value;
};