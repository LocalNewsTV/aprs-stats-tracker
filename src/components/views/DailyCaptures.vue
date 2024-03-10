<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import AprsEntryType from '../../types/AprsEntryType';
  import DataFormatter from '../../utils/DataFormatter';
  import BarChart from '../BarChart.vue';
  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const dates = DataFormatter.daysInWeek;
  const dataByDay = computed(() => DataFormatter.DayConversion(jsonContentModel.value))
  
  const busiestDay = computed(() => dates[dataByDay.value.indexOf(Math.max(...dataByDay.value))])
</script>
<!-- // -->
<template>
<div id="captures-cont" class="full-container">
  <p class="active">Your most active day was
    <span class="accent">{{ busiestDay }}</span>
  </p>
  <BarChart :data="dataByDay" :categories="dates" id="chart" />
</div>
</template>
<!-- // -->
<style scoped>
  #captures-cont { background-color: #5CE6C3; }
  .active { font-size: 32pt;}
  .accent {
    color: #064737;
    font-size: 48pt;
  }
</style>../../types/AprsEntryType
