<template>
  <div></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const arrestData = ref('')
async function getPokemon() {
  let res = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json')
  let data = await res.json()
  arrestData.value = data.results
}
onMounted(() => {
  getPokemon()
})
</script>

<style scoped></style>
