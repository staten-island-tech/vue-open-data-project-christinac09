<template>
  <main>
    <div class="container mx-auto p-4">
      <!-- <div class="card" v-for="a in arrestData" :key="a.arrest_key">
        <h2>{{ a.arrest_boro }}</h2>
      </div> -->
    </div>
    <BarChart />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'
import BarChart from '@/components/BarChart.vue'
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
  const arrestsPerYear = [{ year: 0, amount: 0 }]
  console.log(arrestsPerYear.map((a) => Object.keys(a)))

  arrests.forEach((arrest) => {
    let allYearValues = arrestsPerYear.map((arrest) => arrest[Object.keys(arrest)[0]])
    arrestYear = arrest.arrest_date.slice(0, 4)

    if (allYearValues.includes(arrestYear)) {
      arrestsPerYear.forEach((obj) => {
        if (obj.year === arrestYear) {
          obj.amount++
        }
      })
    } else {
      arrestsPerYear.push({ year: arrestYear, amount: 1 })
    }
  }) /* let keys = arr.map(obj => Object.keys(obj)).flat();
let keyIsMissing = !keys.includes(keyToCheck);

console.log(keyIsMissing); // false
 */
})
</script>
