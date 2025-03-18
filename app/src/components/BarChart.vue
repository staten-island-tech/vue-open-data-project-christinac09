<script setup>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js'
import { list } from 'postcss'

const chartRef = ref(null)

/* onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }
}) */

defineProps({
  labels: Array,
  stats: Array,
})
</script>

<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>
