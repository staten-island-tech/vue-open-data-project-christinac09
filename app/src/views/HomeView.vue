<template>
  <main>
    <div class="container mx-auto p-4">
      <!-- <div class="card" v-for="a in arrestData" :key="a.arrest_key">
        <h2>{{ a.arrest_boro }}</h2>
      </div> -->
    </div>
    <Bar :data="arrestData" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'
import Bar from '@/components/BarChart.vue'
const arrestData = ref('')
const chartData = ref('')
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
  console.log(arrestsPerMonth.map((a) => Object.keys(a)))

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
  chartData.value = {
    labels: arrestsPerMonth.map((arrest) => arrest[Object.keys(arrest)[0]]),
    datasets: [{ data: arrestsPerMonth.map((arrest) => arrest[Object.keys(arrest)[1]]) }],
  }
  /* let keys = arr.map(obj => Object.keys(obj)).flat();
  
let keyIsMissing = !keys.includes(keyToCheck);

console.log(keyIsMissing); // false
 */
})
</script>
