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
let loaded = false
const monthlyData = ref()
const arrestData = ref('')
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
    alert('could not find that character')
  }
}
onMounted(async () => {
  const arrests = await getArrests()
  //filter to get arrests per year
  const arrestsPerMonth = []

  arrests.forEach((arrest) => {
    let allMonthValues = arrestsPerMonth.map((arrest) => arrest[Object.keys(arrest)[0]])
    let arrestMonth = arrest.arrest_date.slice(5, 7)

    if (allMonthValues.includes(arrestMonth)) {
      arrestsPerMonth.forEach((obj) => {
        if (obj.month === arrestMonth) {
          obj.amount++
        }
      })
    } else {
      arrestsPerMonth.push({ month: arrestMonth, amount: 1 })
    }
  })
  console.log(arrestsPerMonth)
  monthlyData.value = {
    labels: arrestsPerMonth.map((arrest) => arrest[Object.keys(arrest)[0]]),
    datasets: [{ data: arrestsPerMonth.map((arrest) => arrest[Object.keys(arrest)[1]]) }],
  }
  console.log(monthlyData.value)
  loaded = true
})
const chartOptions = reactive({
  responsive: true,
})
</script>
