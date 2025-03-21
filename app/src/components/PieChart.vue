<template>
  <div>
    <Pie id="pie-chart" :options="chartOptions" :data="chartData"></Pie>
    <Doughnut id="donut-chart" :options="chartOptions" :data="chartData"></Doughnut>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie, Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
defineProps({
  chartData: Object,
  chartOptions: Object,
})
</script>
