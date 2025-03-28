<template>
  <div class="m-4">
    <h3 class="text-lg">{{ category }}:</h3>
    <select
      @change="onSelect"
      :value="modelValue"
      class="btn w-[50%] border-[#a9c191] bg-[#dfe6da]"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Array,
  modelValue: String,
  category: String,
})

const emit = defineEmits(['update:modelValue'])

const onSelect = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
