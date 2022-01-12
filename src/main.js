import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Toaster from '@meforma/vue-toaster';
import VueApexCharts from "vue3-apexcharts";
import router from './router';
import TableLite from "vue3-table-lite";
import VueTradingView from 'vue-trading-view';

import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

import mitt from 'mitt'


const eventBus = mitt()
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus

// app.use('Datepicker', VueDatepickerUi)
app.use(router)
app.use(VueTradingView)
app.use('Datepicker', Datepicker)
app.use(TableLite)
app.use(Toaster)


app.use(VueApexCharts)



app.mount('#app');

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
app.use(VueTelInput);
app.use(VueAxios, axios)

