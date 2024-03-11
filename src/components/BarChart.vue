<script setup lang="ts">
  import { ref, PropType } from 'vue';
  const { categories, data, horizontal, width, dataLabels } = defineProps({
    categories: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
    data: {
      required: true,
      type: Array as PropType<Array<number>>
    },
    horizontal: {
      required: false,
      default: true,
      type: Boolean as PropType<boolean>
    },
    width: {
      required: false,
      default: 450,
      type: Number as PropType<number>
    },
    dataLabels: {
      required: false,
      default: true,
      type: Boolean as PropType<boolean>
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
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: horizontal,
      }
    },
    dataLabels: {
      enabled: dataLabels
    },
    xaxis: {
      categories: categories,
    }
  });
</script>

<template>
  <apexchart v-if="data.length > 0" :options :series="options.series" type="bar" :width height="350" />
</template>

<!-- // -->
<style scoped>
</style>
