<template>
  <main>
    <div class="container mx-auto p-4 absolute top-32 left-8" v-if="loaded">
      <AgeButton v-for="age in ages" :key="age" :age="age"></AgeButton>
    </div>
  </main>
</template>

<script setup>
import AgeButton from '../components/AgeButton.vue'
import { ref, reactive, onMounted } from 'vue'
let loaded = ref(false)
const arrestData = ref([])
const ages = ref('')
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
      if (existingType) {
        existingType.count++
      } else {
        existingAge.types.push({ type: arrest.ofns_desc, count: 1 })
      }
    } else {
      arrestsPerAge.push({ age: arrest.age_group, types: [{ type: arrest.ofns_desc, count: 1 }] })
    }
  })
  return arrestsPerAge
}

onMounted(async () => {
  const arrests = await getArrests()
  const ageData = await getAges(arrests)
  ages.value = ageData.map((obj) => obj.age)
  const chartOptions = reactive({
    responsive: true,
  })
  loaded.value = true
})
</script>
