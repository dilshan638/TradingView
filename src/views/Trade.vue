<template>
  <trade-layout>
    <div class="row">
        <div class="col-md-7 no-padding-right">
          <top-status />
          <!-- <top-chart /> -->
          <order-history />
        </div>
        <div class="col-md-5">
            <div class="row">
                <div class="col-md-6 no-padding-right">
                   <order-book />
                   <!-- <recent-trades /> -->
                </div>
                <div class="col-md-6">
                    <buy-sell />
                </div>
            </div>
        </div>        
    </div>
  </trade-layout>
</template>

<script>
import TradeLayout from '../layout/TradeLayout.vue'
import TopStatus from '../components/Trade/TopStatus.vue'
// import TopChart from '../components/Trade/TopChart.vue'
import OrderBook from '../components/Trade/OrderBook.vue'
//import RecentTrades from '../components/Trade/RecentTrades.vue'
import BuySell from '../components/Trade/BuySell.vue'
import OrderHistory from '../components/Trade/OrderHistory.vue'

export default {
    name:'trade',
    components: { 
      TradeLayout,
      TopStatus,
      OrderBook,
    //  RecentTrades,
      BuySell,
      //TopChart,
      OrderHistory
    },
    data() {
      return {
      }
    }    
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/Trade/Trade";
</style>