<template>
  <div class="w-[90%] mx-auto max-h-[80vh]">
    <Pie id="pie-chart" :options="chartOptions" :data="chartData"></Pie>
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
