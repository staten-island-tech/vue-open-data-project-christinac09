<template>
  <div class="w-[90%] mx-auto max-h-[80vh]">
    <Bar id="bar-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
defineProps({
  chartData: Object,
  chartOptions: Object,
})
</script>

<style scoped></style>
