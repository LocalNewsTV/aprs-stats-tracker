<template>
  <main class="map-container">
      <l-map ref="map" :zoom :center :useGlobalLeaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenTiles Street Maps"
        >
        </l-tile-layer>
        <l-marker v-for="marker of markers" :lat-lng="marker" @click="centerMap(marker)">
          <l-popup>
            <div class="popup">
              <p><b>Speed:</b> {{ marker.speed }}km/h</p>
              <p><b>Time:</b> {{ new Date(marker.time * 1000).toLocaleTimeString() }}</p>
              <p><b>Date:</b> {{ new Date(marker.time * 1000).toLocaleDateString() }}</p>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
  </main>
</template>

<script setup lang="ts">
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  import { ref } from "vue";
  import AprsEntryType from "../types/AprsEntryType";
  let zoom = ref(9)
  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true})
  const markers = jsonContentModel.value
  const map = ref(null);
  let center = ref([markers[0].lat, markers[0].lng])

  const centerMap = (marker: AprsEntryType) => {
    if (map.value) {
      map.value.leafletObject.setView([marker.lat, marker.lng], 12)
    }
  }
  
</script>

<style scoped>
  .map-container {
    height: 500pt;
    width: var(--medium-screen);
  }
  .popup {
    font-size: 10pt;
  }
  .popup p {
    margin: 0;
    padding: 0;
  }
</style>
