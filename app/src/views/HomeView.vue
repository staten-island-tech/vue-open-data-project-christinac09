<template>
  <div>
    <!-- <div class="card" v-for="a in arrestData" :key="a.arrest_key">
      <h2>{{ a.arrest_boro }}</h2>
    </div> -->
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const arrestData = ref('')
async function getArrests() {
  let res = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json')
  let data = await res.json()
  arrestData.value = data
}
onMounted(() => {
  getArrests()
})
</script>

<style scoped></style>
