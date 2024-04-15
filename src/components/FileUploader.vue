<script setup lang="ts">
import { ref } from 'vue';
import JSONFileParser from '../utils/JSONFileParser';
import AprsEntryType from '../types/AprsEntryType';
  const jsonContentModel = defineModel<Array<AprsEntryType>>({required: true});
  let fileInformation = ref<File>();

  /**
   * @desc Take in JSON file and update jsonContentModel 
   */
  const handleChange = async (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if(JSONFileParser.isJsonFile(file)) {
        fileInformation.value = file;
        const temp = await JSONFileParser.parse(file);
        if (typeof temp === typeof []){
          jsonContentModel.value = [...temp]
        }
      }
    }
  }
  /**
   * @desc Click handler for fileUploader, shifts focus to <input type="file">
   */
  const handleClick = (e: Event) => {
    e.preventDefault();
    document.getElementById('fileUploader')?.click();
  }
</script>
<!-- // -->
<template>
  <label for="fileUploader">
    <input
      id="fileUploader" 
      @change="handleChange($event)"
      class="fileUploader"
      type="file"
      accept="application/JSON"
    />
    <button @click="handleClick">
      Upload
    </button>
    <span>
      {{ fileInformation?.name || "No file selected..." }}
    </span>
  </label>
</template>
<!-- // -->
<style scoped>

  #fileUploader { display: none; }
  button {
    background: orange;
    height: 100pt;
    width: 100pt;
    font-size: 18pt;
    border-radius: 50%;
    color: var(--eigengrau);
    border: 1pt solid darkorange;
    padding: 1em;
  }
  span {
    display: none;
  }
  label { 
    color: var(--eigengrau);
    display: flex;
  }
  button:hover {
    cursor: pointer;
    background: var(--button-hover);
  }
  @media screen and (min-width: 720pt) {
    span {
      display: block;
    }
    button {
      height: 200pt;
      width: 200pt;
      font-size: 38pt;
    }
  }
</style>
