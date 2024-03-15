<script setup lang="ts">
import AprsEntryType from '../../types/AprsEntryType';
import FileUploader from '../FileUploader.vue';
import truck from '/truck.svg';
import car from '/car.svg';
const jsonContentModel = defineModel<Array<AprsEntryType>>({ required: true })

</script>
<!-- //  -->
<template>
  <div id="hero-cont" class="full-container">
    <img :src="car" class="background" />
    <div class="left">
      <h1>APRS In Review <img :src="truck" /></h1>
      <p>Upload your JSON data export from
        <a href="https://aprs.fi/export/" target="_blank">aprs.fi</a>
        to get started
      </p>
      <p class="small">a LocalNewsTV experience</p>
    </div>
    <div class="right">
      <FileUploader v-model="jsonContentModel" />
    </div>
  </div>
</template>
<!-- //  -->
<style scoped>
  h1 { font-size: 46pt; }
  a { color: var(--eigengrau); }
  .left, .right {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    z-index: 2;
    min-height: 45svh;
  }
  p {
    font-size: 16pt;
    padding-left: 8pt;
  }
  .small {
    font-size: 12pt;
  }
  .left{
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
  }

  #hero-cont {
    background-color: #ffbf00;
    flex-direction: row;
    position: relative;
  }
  .background {
    position: absolute;
    height: 425pt;
    width: 425pt;
    left: 10%;
    bottom: 10%;
    z-index: 1;
  }
  img {
    height: 45pt;
    width: 45pt;
  }
</style>
