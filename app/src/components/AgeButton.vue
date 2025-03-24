<template>
  <router-link :to="agePath" class="btn bg-[#92a286] border-none shadow-sm shadow-[#bcd2b0] m-4">{{
    age
  }}</router-link>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  age: String,
})
const agePath = computed(() => {
  return `/${props.age}`
})
</script>

<style scoped></style>
