<script setup lang="ts">
import { defineModel } from 'vue';
import Map from '../Map.vue';
import AprsEntryType from '../../types/AprsEntryType';

const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
</script>
<!-- // -->
<template>
  <div id="map-section" class="full-container">
    <h1>Oh the places you'll go</h1>
    <p>On the road less travelled here's where you stood out!</p>
    <Map v-model="jsonContentModel"></Map>
  </div>
</template>
<!-- // -->
<style scoped>
  #map-section {
    /* background-color: #400073 */
    background-color: #AFB1FF;
  }
</style>
