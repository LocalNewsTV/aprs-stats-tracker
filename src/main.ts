
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.component('apexchart', VueApexCharts);
app.mount('#app');
