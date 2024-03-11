<script setup lang="ts">
  import { ref, PropType } from 'vue';
  const { categories, data } = defineProps({
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
      {
        data: [...data],
        name: 'Captured Broadcasts'
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: true 
    },
    xaxis: {
      categories: categories,
    }
  });
</script>

<template>
  <div id="app">
    <apexchart v-if="data.length > 0" :options :series="options.series" type="bar" height="350" />
  </div>
</template>

<!-- // -->
<style scoped>
</style>
