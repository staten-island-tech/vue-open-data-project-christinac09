<template>
  <div v-if="loaded" class="absolute top-36 left-16 w-[100vw] h-[60vh]">
    <h2 class="text-2xl my-4">Arrest Type Distribution by Borough, Gender, Age, and Race</h2>
    <div class="flex flex-row w-[100%] overflow-y-hidden">
      <div class="flex flex-col w-[30%]">
        <DropdownComponent
          v-if="loaded"
          :options="filterOptions.borough"
          :category="categories[0]"
          v-model="selectedBoro"
        />
        <DropdownComponent
          v-if="loaded"
          :options="filterOptions.gender"
          :category="categories[1]"
          v-model="selectedGender"
        />
        <DropdownComponent
          v-if="loaded"
          :options="filterOptions.age"
          :category="categories[2]"
          v-model="selectedAge"
        />
        <DropdownComponent
          v-if="loaded"
          :options="filterOptions.race"
          :category="categories[3]"
          v-model="selectedRace"
        />
      </div>

      <div class="w-[70%] mx-4">
        <h3 v-if="filteredData.labels.length === 0" class="text-lg m-12">
          No data available. Try different filter options
        </h3>
        <PieChart v-if="loaded" :chartData="filteredData" :chartOptions="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import DropdownComponent from '../components/DropdownComponent.vue'
import { getArrests } from '../components/function'
import PieChart from '../components/PieChart.vue'
const arrestData = ref([])
const filterOptions = ref({ borough: [], gender: [], age: [], race: [] })
const filteredData = ref({ labels: [], datasets: [{ data: [] }] })
const loaded = ref(false)
const chartOptions = reactive({
  responsive: true,
  plugins: {
    //legend: false,
  },
})
const categories = ['Borough', 'Gender', 'Age Group', 'Race']
async function getRaces(data) {
  const races = []
  data.forEach((arrest) => {
    if (arrest.perp_race !== 'UNKNOWN') {
      let existingRace = races.find((r) => r === arrest.perp_race)
      if (!existingRace) {
        races.push(arrest.perp_race)
      }
    }
  })
  return races
}
async function getTypes(data) {
  const types = []
  data.forEach((arrest) => {
    if (arrest.ofns_desc !== '(null)') {
      let existingType = types.find((type) => type.type === arrest.ofns_desc)
      if (existingType) {
        existingType.count++
      } else {
        types.push({ type: arrest.ofns_desc, count: 1 })
      }
    }
  })
  return types
}
const selectedBoro = ref('')
const selectedGender = ref('')
const selectedAge = ref('')
const selectedRace = ref('')

onMounted(async () => {
  const arrests = await getArrests()
  arrestData.value = arrests
  const races = await getRaces(arrests)
  filterOptions.value = {
    borough: ['All', 'M', 'B', 'Q', 'S', 'K'],
    gender: ['All', 'M', 'F'],
    age: ['All', '<18', '18-24', '25-44', '45-64', '65+'],
    race: ['All', ...races],
  }
  loaded.value = true
})
const filteredArrests = computed(() => {
  return arrestData.value.filter((arrest) => {
    return (
      (selectedBoro.value === 'All' || // both 'All' and '' return all, '' is from unchanged ref variable when nothing is selected
        selectedBoro.value === '' ||
        arrest.arrest_boro === selectedBoro.value) &&
      (selectedGender.value === 'All' ||
        selectedGender.value === '' ||
        arrest.perp_sex === selectedGender.value) &&
      (selectedAge.value === 'All' ||
        selectedAge.value === '' ||
        arrest.age_group === selectedAge.value) &&
      (selectedRace.value === 'All' ||
        selectedRace.value === '' ||
        arrest.perp_race === selectedRace.value)
    )
  })
})
watch(filteredArrests, async (newFilteredArrests) => {
  const types = await getTypes(newFilteredArrests) // recalculate types
  filteredData.value = {
    labels: types.map((type) => type.type),
    datasets: [
      { data: types.map((type) => type.count), backgroundColor: ['#a5b299', '#c1c4a4', '#b7c297'] },
    ],
  }
})
</script>
