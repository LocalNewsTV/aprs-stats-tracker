<script setup lang="ts">
  import { ref, PropType } from 'vue';
  const { data, categories } = defineProps({
    categories: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
    data: {
      required: true,
      type: Array as PropType<Array<number>>
    }
  })

  const options = ref({
    series: [
      ...data
    ],
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: true
    },
    labels: categories
  });
</script>

<template>
  <apexchart v-if="data.length > 0" :options :series="options.series" type="donut" height="350" />
</template>

<!-- // -->
<style scoped>
</style>
