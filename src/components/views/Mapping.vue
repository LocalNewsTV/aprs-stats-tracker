<script setup lang="ts">
import { defineModel } from 'vue';
import LeafletMap from '../LeafletMap.vue';
import AprsEntryType from '../../types/AprsEntryType';
import balloon from '/balloon.svg';

const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
</script>
<!-- // -->
<template>
  <div id="map-section" class="full-container">
    <h1>Oh the places you'll go</h1>
    <p>On the road less travelled here's where you stood out!</p>
    <LeafletMap v-model="jsonContentModel" />
    <img :src="balloon" class="background bg-a" />
    <img :src="balloon" class="background bg-b" />
    <img :src="balloon" class="background bg-c" />
  </div>
</template>
<!-- // -->
<style scoped>
  #map-section {
    position:relative;
    background-color: #AFB1FF;
    box-sizing: border-box;
  }
  @media screen and (max-width: 720pt) {
    .bg-a, .bg-b, .bg-c { display: none; }
  }
  @media screen and (min-width: 720pt) {
    .bg-a, .bg-b, .bg-c {
      position: absolute;
      height: 200pt;
      width: 200pt;
      z-index: 1;
    }
    .bg-a {
      left: 0;
      bottom: 2%;
    }
    .bg-b {
      right: 0;
      bottom: 23%;
    }
    .bg-c {
      left: 0;
      top: 15%;
    }
  }
</style>
