<template>
  <div class="w-[80vw] max-h-screen absolute top-36 left-0">
    <PieChart v-if="loaded" :chartData="ageData" :chartOptions="chartOptions" />
  </div>
</template>

<script setup>
import { getArrests } from '../components/function.js'
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
  plugins: {
    legend: false,
    title: {
      display: true,
      text: `Arrest Type Distribution by Age Group (${ageSelected})`,
    },
  },
})

//type for each age
async function getAges(data) {
  const arrestsPerAge = []
  data.forEach((arrest) => {
    let existingAge = arrestsPerAge.find((obj) => obj.age === arrest.age_group)
    if (existingAge) {
      let existingType = existingAge.types.find((obj) => obj.type === arrest.ofns_desc)
      if (arrest.ofns_desc !== '(null)') {
        // if i combine this w/ line below, the else would still run if null
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
}
async function getSpecificAge(data, age) {
  const filtered = data.filter((arrest) => arrest.age === age) //filtered returns an array of the object
  ageData.value = {
    labels: filtered[0].types.map((type) => type.type),
    datasets: [
      {
        label: 'Number of Arrests',
        data: filtered[0].types.map((type) => type.count),
        backgroundColor: ['#a5b299', '#c1c4a4', '#b7c297'],
      },
    ],
  }
  return filtered[0]
}
onMounted(async () => {
  const arrests = await getArrests()
  const data = await getAges(arrests)
  await getSpecificAge(data, ageSelected)
  loaded.value = true
})
</script>

<style scoped></style>
