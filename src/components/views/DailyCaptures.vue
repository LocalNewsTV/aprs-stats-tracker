<script setup lang="ts">
  import { computed, } from 'vue';
  import AprsEntryType from '../../types/AprsEntryType';
  import DataFormatter from '../../utils/DataFormatter';
  import BarChart from '../BarChart.vue';
  import DonutChart from '../DonutChart.vue';
  import chart from '/graph-up.svg';

  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const dates = DataFormatter.daysInWeek;
  const dataByDay = computed(() => DataFormatter.DayConversion(jsonContentModel.value))
  const busiestDay = computed(() => dates[dataByDay.value.indexOf(Math.max(...dataByDay.value))])
  const spreadByHours = computed(() => DataFormatter.HourConversion(jsonContentModel.value))
  const timeOfDayBreakdown = computed(() => DataFormatter.morningNoonOrNight(spreadByHours.value) )
  const morningNoonNight = computed(() => {
    const { morning, noon, night } = timeOfDayBreakdown.value;
    if(morning > noon && morning > night) { return "Morning"; }
    if(noon > morning && noon > night) { return "Afternoon"; }
    return "Night";
  })
</script>
<!-- // -->
<template>
<div id="captures-cont" class="full-container">
  <img :src="chart" class="background" />
  <div class="content-container">
    <p class="active">Your most active day was
      <span class="accent">{{ busiestDay }}</span>
    </p>
    <div class="flex-row">
      <div class="flex-col">
        <p class="">
          You often travel in the
          <span class="accent-small">{{morningNoonNight}}</span>
        </p>
        <DonutChart
          :data="[timeOfDayBreakdown.morning, timeOfDayBreakdown.noon, timeOfDayBreakdown.night]"
          :categories="['Morning', 'Noon', 'Night']"
          id="hourChart"
        />
      </div>
      <BarChart
        :data="dataByDay"
        :categories="dates"
        id="dayChart"
      />
    </div>
    <div class="flex-row">
      <BarChart
        :data="spreadByHours"
        :categories="DataFormatter.timeConversion"
        id="hourChart"
        :horizontal="false"
        :dataLabels="false"
        :width="750"
      />
      <p></p>
    </div>
  </div>
</div>
</template>
<!-- // -->
<style scoped>
  #captures-cont { 
    position: relative;
    background-color: #16D0A6;
  }
  .content-container {
    width: 100%;
    z-index: 2;
    max-width: var(--medium-screen);
  }
  .active { 
    font-size: 32pt;
    margin-bottom: 1.5em;
    margin-top: 1em;
  }
  .accent {
    color: #064737;
    font-size: 48pt;
  }
  .accent-small {
    color: green;
    font-size: 20pt;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .background {
    position: absolute;
    height: 350pt;
    width: 350pt;
    left: 3em;
    bottom: 3em;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
</style>
