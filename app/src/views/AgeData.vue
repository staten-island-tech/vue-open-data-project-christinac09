<template>
  <div class="w-[80vw] max-h-screen absolute top-36 left-0">
    <PieChart v-if="loaded" :chartData="ageData" :chartOptions="chartOptions" />
  </div>
</template>

<script setup>
import PieChart from '../components/PieChart.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const ageSelected = route.params.age
import { ref, reactive, onMounted } from 'vue'
let loaded = ref(false)
const arrestData = ref([])
const ageData = ref({
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
//type for each age
async function getAges(data) {
  const arrestsPerAge = []
  data.forEach((arrest) => {
    let existingAge = arrestsPerAge.find((obj) => obj.age === arrest.age_group)
    if (existingAge) {
      let existingType = existingAge.types.find((obj) => obj.type === arrest.ofns_desc)
      if (arrest.ofns_desc !== '(null)') {
        if (existingType) {
          existingType.count++
        } else {
          existingAge.types.push({ type: arrest.ofns_desc, count: 1 })
        }
      }
    } else {
      arrestsPerAge.push({ age: arrest.age_group, types: [{ type: arrest.ofns_desc, count: 1 }] })
    }
  })
  return arrestsPerAge
  /* ageData.value = {
    labels: arrestsPerAge.map((arrest) => arrest.age_group),
    datasets: [
      {
        label: 'Types of Arrests per Age Group',
        data: arrestsPerAge.map((arrest) => arrest.amount),
      },
    ],
  } */
}
async function getSpecificAge(data, age) {
  data.forEach((arrest) => {
    if (arrest.age === age) {
      ageData.value = {
        labels: arrest.types.map((type) => type.type),
        datasets: [
          {
            label: 'Types of Arrests per Age Group',
            data: arrest.types.map((type) => type.count),
          },
        ],
      }
      return arrest
    }
  })
}
onMounted(async () => {
  const arrests = await getArrests()
  const data = await getAges(arrests)
  await getSpecificAge(data, ageSelected)

  loaded.value = true
})
</script>

<style scoped></style>
