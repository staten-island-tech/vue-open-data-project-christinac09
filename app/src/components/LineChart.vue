<template>
  <div class="w-[90%] mx-auto max-h-[80vh]">
    <Line id="line-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from 'chart.js'
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title)

/* const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
} */
defineProps({
  chartData: Object,
  chartOptions: Object,
})
</script>
