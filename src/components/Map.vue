<template>
  <main class="map-container">
      <l-map ref="map" :zoom :center :useGlobalLeaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenTiles Street Maps"
        >
        </l-tile-layer>
        <l-marker v-for="marker of markers" :lat-lng="marker"></l-marker>
      </l-map>
  </main>
</template>

<script setup lang="ts">
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  import { ref } from "vue";
  import AprsEntryType from "../types/AprsEntryType";
  let zoom = ref(9)
  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const markers = [...new Set(jsonContentModel.value.map((item) => {return {lat: item.lat.toFixed(3), lng: item.lng.toFixed(3)}}))]
  let center = ref([markers[0].lat, markers[0].lng])
</script>

<style scoped>
  .map-container {
    height: 500pt;
    width: var(--medium-screen);
  }


</style>
