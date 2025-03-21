<template>
  <main>
    <div class="container mx-auto p-4">
      <!-- <div class="card" v-for="a in arrestData" :key="a.arrest_key">
        <h2>{{ a.arrest_boro }}</h2>
      </div> -->
    </div>
    <BarChart v-if="loaded" :chartData="monthlyData" :chartOptions="chartOptions" />
    <PieChart v-if="loaded" :chartData="boroughData" :chartOptions="chartOptions" />
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '../components/PieChart.vue'
let loaded = ref(false)
const arrestData = ref([])
const monthlyData = ref({
  labels: [],
  datasets: [{ data: [] }],
})
const boroughData = ref({
  labels: [],
  datasets: [{ data: [] }],
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
  console.log(arrestsPerMonth)
  monthlyData.value = {
    labels: arrestsPerMonth.map((arrest) => arrest.month),
    datasets: [
      { label: 'Monthly Arrests in 2024', data: arrestsPerMonth.map((arrest) => arrest.amount) },
    ],
  }
  console.log(monthlyData.value)
}
async function getBoroData(data) {
  const arrestsPerBorough = []

  data.forEach((arrest) => {
    let existingBoro = arrestsPerBorough.find((obj) => obj.boro === arrest.arrest_boro)
    if (existingBoro) {
      existingBoro.amount++
    } else {
      arrestsPerBorough.push({ boro: arrest.arrest_boro, amount: 1 })
    }
  })
  console.log(arrestsPerBorough)
  boroughData.value = {
    labels: arrestsPerBorough.map((arrest) => arrest.boro),
    datasets: [{ label: 'label', data: arrestsPerBorough.map((arrest) => arrest.amount) }],
  }
  console.log(boroughData.value)
}
onMounted(async () => {
  const arrests = await getArrests()
  await getMonthlyData(arrests)
  await getBoroData(arrests)
  const chartOptions = reactive({
    responsive: true,
  })
  loaded.value = true
})
</script>
