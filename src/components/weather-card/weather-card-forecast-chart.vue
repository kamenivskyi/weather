<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import type { VNodeRef } from 'vue';
import Chart from 'chart.js/auto';
import type { ForecastDay } from '@/models';
import { lineChartOptions } from '@/constants';
import { useI18n } from 'vue-i18n';
import { enGB, uk } from 'date-fns/locale';
import { useSettingsStore } from '@/stores/settings';
import { addMinutes } from 'date-fns';

interface Props {
  data: ForecastDay[][] | null;
}

const props = defineProps<Props>();
const { t } = useI18n();
const settings = useSettingsStore();

const canvasRef = ref<VNodeRef | null>(null);
const chart = ref<any>(null);

const averageTemperatures = computed(() => {
  if (props.data) {
    return props.data.map((array: ForecastDay[]) => {
      const sumTemp = array.reduce((sum, item: ForecastDay) => sum + item.main.temp, 0);
      return sumTemp / array.length;
    });
  }
  return [];
});

const daysOfWeek = computed(() => {
  if (props.data) {
    return props.data.map((array: ForecastDay[]) => {
      return getDayOfWeek(array[0].dt);
    });
  }
  return [];
});

const canGenerateChart = computed(
  () => canvasRef.value && daysOfWeek.value?.length > 0 && averageTemperatures.value?.length > 0
);

const getDayOfWeek = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  
  return format(
    addMinutes(date, date.getTimezoneOffset()), 
    'EEEE', 
    { locale: settings.selectedLang === 'ua' ? uk : enGB }
  );
};

onMounted(() => {
  initChart();
});

watch(
  props,
  (newProps) => {
    if (newProps.data) {
      initChart();
    }
  },
  { immediate: true, deep: true }
);

watch(() => settings.selectedLang, (settings) => {
  nextTick(() => {
    initChart();
  })
}, { deep: true });

function initChart() {
  if (chart.value) {
    chart.value.destroy();
  }

  if (canGenerateChart.value) {
    const chartCtx = canvasRef.value.getContext('2d');

    chart.value = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: daysOfWeek.value,
        datasets: [
          {
            label: t('chart.forecast.legend'),
            borderWidth: 2,
            data: averageTemperatures.value
          }
        ]
      },
      options: lineChartOptions
    });
  }
}
</script>
