<template>
    <div class="trade-box main-chart-area">
        <div class="row">
            <div class="col-md-12">
                <div class="hello chart-grid" id="chartBox" ref="chartBox">
                  <i v-bind:class="[expand == true ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line']" @click="toggleview"></i>
                  <!-- <VueTradingView :options="widgetOptions"/> -->
                  <iframe src="http://localhost:8081/" width="100%" height="516px" frameborder="0" sandbox="allow-scripts" class="app-iframe"></iframe>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
//const Datafeeds = chartapi();
//import VueTradingView from 'vue-trading-view/src/vue-trading-view';

export default { 
  name: "App",
  components: {
   // VueTradingView
  },
  data() {
    return{
      widgetOptions: {
        Datafeeds: "",
        debug: false,
        symbol: ' BTC/USDC',
        interval: 'D',
        fullscreen: true,
        hide_side_toolbar: false,
     //   test: DATAFEED.userInput,
     //   test2: DATAFEED.widget,
      //  datafeed: new Datafeeds.UDFCompatibleDatafeed('http://tradeapi.exus.live/api/ticker?productId=BTC/USDC&granularity=15'),
      //  datafeed: DATAFEED,
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
      //  time: '2018-12-19',
      //  open: 130,
      //  high: 170,
      //  low: 115,
      //  close: 150,  
       
      },
      //test:[1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ],
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
    },
    async matchHeight() {
      let height = this.$refs.chartBox.clientHeight;
      console.log(height)
    },    
  },
  mounted() {
   // this.testf();
  //  this.initOnReady();
  this.matchHeight()
  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>