import { createApp } from 'vue'
import App from './App.vue'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toaster from '@meforma/vue-toaster';
import VueApexCharts from "vue3-apexcharts";
//import VueSession from 'vue-session'
import router from './router';
import TableLite from "vue3-table-lite";

import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import TradingVue from 'trading-vue-js'

import mitt from 'mitt'

const eventBus = mitt()
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus

app.use('Datepicker', VueDatepickerUi)
app.use(router)
app.use(TradingVue)
app.use(TableLite)
app.use(Toaster)
//app.use(eventBus)
app.use(VueApexCharts)


app.mount('#app');

//app.component("money3", Money3Component);

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
app.use(VueTelInput);
app.use(VueAxios, axios)

//createApp(App).mount('#app')

Amplify.configure(awsconfig);
Auth.configure(awsconfig);