<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mb-4">Hello Vite!</h1>
      <button class="btn btn-primary">Click Me</button>
    </div>
  </div>
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

<style scoped></style>
