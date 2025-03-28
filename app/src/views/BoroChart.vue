<template>
  <div class="w-[80vw] max-h-screen absolute top-36 left-0">
    <BarChart v-if="loaded" :chartData="boroughData" :chartOptions="chartOptions" />
  </div>
</template>

<script setup>
import { getArrests } from '../components/function'
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
  plugins: {
    title: {
      display: true,
      text: 'Arrests Per Borough',
    },
  },
})

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
