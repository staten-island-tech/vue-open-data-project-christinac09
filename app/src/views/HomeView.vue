<template>
  <main>
    <div class="container mx-auto p-4">
      <!-- <div class="card" v-for="a in arrestData" :key="a.arrest_key">
        <h2>{{ a.arrest_boro }}</h2>
      </div> -->
    </div>
    <BarChart v-if="loaded" :chartData="monthlyData" :chartOptions="chartOptions" />
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'
let loaded = ref(false)
const monthlyData = ref({
  labels: [],
  datasets: [{data:[],}]
})
const arrestData = ref([])
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
onMounted(async () => {
  const arrests = await getArrests()
  //filter to get arrests per month
  const arrestsPerMonth = []

  arrests.forEach((arrest) => {
    let arrestMonth = arrest.arrest_date.slice(5, 7)

    let existingMonth = arrestsPerMonth.find((obj) => obj.month === arrestMonth)
    if (existingMonth) {
      existingMonth.amount++
    } else {
      arrestsPerMonth.push({ month: arrestMonth, amount: 1 })
    }
  })
  console.log(arrestsPerMonth)
  monthlyData.value = {
    labels: arrestsPerMonth.map((arrest) => arrest.month),
    datasets: [{ label: 'Monthly Arrests in 2024', data: arrestsPerMonth.map((arrest) => arrest.amount) }],
  }
  console.log(monthlyData.value)
  /* const chartOptions = reactive({
  responsive: true,
}) */
  loaded.value = true
})
const chartOptions = reactive({
  responsive: true,
})
</script>
