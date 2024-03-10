<script setup lang="ts">
  import { ref } from 'vue';
  import Hero from './components/views/Hero.vue'
  import AprsEntryType from './types/AprsEntryType';
  import DailyCaptures from './components/views/DailyCaptures.vue';
  import CapturesInPeriod from './components/views/CapturesInPeriod.vue';

  const jsonContentModel = ref<Array<AprsEntryType>>([]);

</script>

<template>
  <Hero v-model="jsonContentModel" />
  <CapturesInPeriod v-if="jsonContentModel.length > 0" v-model="jsonContentModel" />
  <DailyCaptures v-if="jsonContentModel.length > 0" v-model="jsonContentModel" />
</template>

<style scoped>

</style>
