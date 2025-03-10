<template>
  <main>
    <div class="container mx-auto p-4">
      <div class="card" v-for="a in arrestData" :key="a.arrest_key">
        <h2>{{ a.arrest_boro }}</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
onMounted(() => {
  getArrests()
})
</script>
