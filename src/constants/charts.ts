export const lineChartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
      }
    },
    y: {
      grid: {
        display: true
      },
      ticks: {
        callback: function(value: string) {
          return value + ' ℃';
        }
      }
    },
  }
}