<template>
    <div class="trade-box main-chart-area">
        <div class="row">
            <div class="col-md-12">
                <!-- <img src="images/logo/chart.jpeg" class="img-responsive" /> -->
                <div class="hello chart-grid">
                  <i v-bind:class="[expand == true ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line']" @click="toggleview"></i>
                  <VueTradingView :options="widgetOptions" />
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/vue-trading-view';
export default {
  name: "App",
  components: {
    VueTradingView
  },
  data() {
    return{
      widgetOptions: {
        debug: false,
        symbol: 'BTCUSDT',
        datafeed: [],//Datafeed, // our datafeed object
        interval: 'D',
        fullscreen: true,
       // container_id: 'tv_chart_container',
      // library_path: '/charting_library/',
        locale: 'en',
        theme: 'dark',
        style: 1,
      //  disabled_features: ['use_localstorage_for_settings'],
        enabled_features: [],
        withdateranges: true,
      //  client_id: 'test',
      //  user_id: 'public_user_id',
      //  fullscreen: false,
        autosize: true,    
      //  container_id: 'tv_chart_container'        
      },
      expand: false
    }
  },
  methods: {
    async toggleview() {
      this.expand = !this.expand
      if(this.expand == true) {
        document.querySelector("body").classList.add("fullscreen-chart");
      }
      else{
        document.querySelector("body").classList.remove("fullscreen-chart");
      }
      
    }

  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>