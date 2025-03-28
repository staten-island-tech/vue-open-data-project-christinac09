<template>
  <div>
    <h2 class="absolute top-40 left-16 text-xl">Arrest Type Distribution by Age Group</h2>
    <div class="container mx-auto p-4 absolute top-48 left-8" v-if="loaded">
      <AgeOption v-for="age in ages" :key="age" :age="age"></AgeOption>
    </div>
  </div>
</template>

<script setup>
import { getArrests } from '../components/function'
import AgeOption from '../components/AgeOption.vue'
import { ref, reactive, onMounted } from 'vue'
let loaded = ref(false)
const arrestData = ref([])
const ages = ref('')

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

<style scoped></style>
