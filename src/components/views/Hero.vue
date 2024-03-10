<script setup lang="ts">
import AprsEntryType from '../../types/AprsEntry';
import FileUploader from '../FileUploader.vue';
import truck from '/truck.svg';

const jsonContentModel = defineModel<Array<AprsEntryType>>({ required: true })

</script>
<!-- //  -->
<template>
  <div id="hero-cont" class="full-container">
    <div class="left">
      <h1>APRS In Review <img :src="truck" /></h1>
      <p>Upload your data from
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
}
img {
  height: 45pt;
  width: 45pt;
}
</style>
