import { type ScaleChartOptions } from 'chart.js';

export const lineChartOptions: ScaleChartOptions<'line'> | any = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: true
      },
      ticks: {
        callback: function (value: string) {
          return Number(value).toFixed(1) + ' ℃';
        }
      }
    }
  }
};
