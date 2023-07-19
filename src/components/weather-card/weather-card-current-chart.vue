<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
interface Props {
  temperatureMin: number | undefined;
  tempereatureMax: number | undefined;
  tempereatureAvg: number | undefined;
}

const props = defineProps<Props>();

import { onMounted, ref, watch } from 'vue';
import type { VNodeRef } from 'vue';
import Chart from 'chart.js/auto';
import { lineChartOptions } from '@/constants';

const canvasRef = ref<VNodeRef | null>(null);
const chart = ref<any>(null);

onMounted(() => {
  initChart();
});

watch(
  props,
  (newProps) => {
    if (newProps) {
      initChart();
    }
  },
  { immediate: true, deep: true }
);

function initChart() {
  console.log('props: ', props);
  if (chart.value) {
    chart.value.destroy();
  }

  if (canvasRef.value && props.tempereatureAvg) {
    const chartCtx = canvasRef.value.getContext('2d');

    chart.value = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: ['Min', 'Avg', 'Max'],
        datasets: [
          {
            label: 'Temperature',
            borderWidth: 2,
            data: [props.temperatureMin, props.tempereatureAvg, props.tempereatureMax]
          }
        ]
      },
      options: lineChartOptions
    });
  }
}
</script>
