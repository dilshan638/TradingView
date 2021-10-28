<template>
    <div class="trade-box">
        <div class="row">
            <div class="col-md-12">
                <!-- <img src="images/logo/chart.jpeg" class="img-responsive" /> -->
                <div class="hello">
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
        symbol: 'NASDAQ:AAPL',
      // datafeed: Datafeed, // our datafeed object
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
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>