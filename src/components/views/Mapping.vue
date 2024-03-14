<script setup lang="ts">
import { defineModel } from 'vue';
import Map from '../Map.vue';
import AprsEntryType from '../../types/AprsEntryType';

const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
</script>
<!-- // -->
<template>
  <Map v-model="jsonContentModel" />
</template>
<!-- // -->
<style scoped>

</style>
