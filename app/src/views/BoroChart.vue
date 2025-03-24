<template>
  <div class="w-[80vw] max-h-screen absolute top-36 left-0">
    <BarChart v-if="loaded" :chartData="boroughData" :chartOptions="chartOptions" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import BarChart from '../components/BarChart.vue'
let loaded = ref(false)
const arrestData = ref([])
const boroughData = ref({
  labels: [],
  datasets: [{ data: [] }],
})
const chartOptions = reactive({
  responsive: true,
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
  boroughData.value = {
    labels: arrestsPerBorough.map((arrest) => arrest.boro),
    datasets: [
      {
        label: 'Number of Arrests',
        data: arrestsPerBorough.map((arrest) => arrest.amount),
        backgroundColor: ['#8ba49a'],
      },
    ],
  }
}
onMounted(async () => {
  const arrests = await getArrests()
  await getBoroData(arrests)

  loaded.value = true
})
</script>
