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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
  if (chart.value) {
    chart.value.destroy();
  }

  if (canvasRef.value && props.tempereatureAvg) {
    const chartCtx = canvasRef.value.getContext('2d');

    chart.value = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: [
          t('chart.labels.minTemperature'), 
          t('chart.labels.avgTemperature'), 
          t('chart.labels.maxTemperature')
        ],
        datasets: [
          {
            label: t('chart.current.legend'),
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
