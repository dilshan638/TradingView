<template>
    <div class="trade-box main-chart-area">
        <div class="row">
            <div class="col-md-12">
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
   props: [
   "fullPairName",
  ],
  components: {
    VueTradingView
  },

 
  
  data() {
    return{
    
      widgetOptions: {
        debug: false,
        symbol:'BTC/USDC',
          datafeed:[
          [ 1551132000000, 13.7, 30, 6.6,  30,  206 ],
          [ 1551135600000, 29.9, 33, 21.3, 21.8, 74 ],
          [ 1551139200000, 21.7, 25.9, 18, 24,  140 ],
          [ 1551142800000, 24.1, 24.1, 24, 24.1, 29 ]
        ],
        interval: 'D',
        fullscreen: true,
        hide_side_toolbar: false,
        locale: 'en',
        theme: 'dark',
        style: 1,
        enabled_features: [],
        withdateranges: true,
        autosize: true, 
      },
        expand: false,
        pairName:"",
      
    }
  },

  watch: {
    fullPairName: function(value) {
      this.widgetOptions.symbol=value
  if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
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

   
   

  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>