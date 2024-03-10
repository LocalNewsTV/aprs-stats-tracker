<script setup lang="ts">
  import { ref } from 'vue';
  import Hero from './components/views/Hero.vue'
  import AprsEntryType from './types/AprsEntry';
import DailyCaptures from './components/views/DailyCaptures.vue';

  const jsonContentModel = ref<Array<AprsEntryType>>([]);

</script>

<template>
  <Hero v-model="jsonContentModel" />
  <DailyCaptures v-if="jsonContentModel.length > 0" />
</template>

<style scoped>

</style>
