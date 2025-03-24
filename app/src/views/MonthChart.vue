<template>
  <div class="w-[80vw] max-h-screen absolute top-36 left-0">
    <LineChart v-if="loaded" :chartData="monthlyData" :chartOptions="chartOptions" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import LineChart from '@/components/LineChart.vue'
let loaded = ref(false)
const arrestData = ref([])
const monthlyData = ref({
  labels: [],
  datasets: [{ data: [] }],
})
const chartOptions = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Arrests Per Month',
    },
    legend: {
      display: true,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
})
async function getArrests() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json')
    if (response.status != 200) {
      throw new Error(response)
    } else {
      const data = await response.json()
      arrestData.value = data
      return data
    }
  } catch (error) {
    alert('error fetching arrest data')
  }
}
async function getMonthlyData(data) {
  //filter to get arrests per month
  const arrestsPerMonth = []

  data.forEach((arrest) => {
    let arrestMonth = arrest.arrest_date.slice(5, 7)

    let existingMonth = arrestsPerMonth.find((obj) => obj.month === arrestMonth) //check if an object for that months already exists, returns boolean
    if (existingMonth) {
      existingMonth.amount++
    } else {
      arrestsPerMonth.push({ month: arrestMonth, amount: 1 })
    }
  })
  monthlyData.value = {
    labels: arrestsPerMonth.map((arrest) => arrest.month),
    datasets: [
      {
        label: 'Monthly Arrests in 2024',
        data: arrestsPerMonth.map((arrest) => arrest.amount),
        borderColor: ['#a4b58c'],
      },
    ],
  }
}
onMounted(async () => {
  const arrests = await getArrests()
  await getMonthlyData(arrests)

  loaded.value = true
})
</script>

<style scoped></style>
