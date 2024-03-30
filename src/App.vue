<script setup lang="ts">
  import { ref } from 'vue';
  import Hero from './components/views/Hero.vue'
  import AprsEntryType from './types/AprsEntryType';
  import DailyCaptures from './components/views/DailyCaptures.vue';
  import CapturesInPeriod from './components/views/CapturesInPeriod.vue';
  import Mapping from './components/views/Mapping.vue';

  const jsonContentModel = ref<Array<AprsEntryType>>([]);

</script>

<template>
  <Hero v-model="jsonContentModel" />
  <div v-if="jsonContentModel.length > 0" >
    <CapturesInPeriod v-model="jsonContentModel" />
    <DailyCaptures v-model="jsonContentModel" />
    <Mapping v-model="jsonContentModel" />
  </div>
</template>

<style scoped>

</style>
