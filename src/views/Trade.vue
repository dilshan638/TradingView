<template>
  <trade-layout>
    <div class="row"> 
        <div class="col-md-7 no-padding-right">
          <top-status @symbol="selectSymbol" @pair_name="selectPair" @full_pair_name="setPairName" />
          <top-chart />
          <order-history  />
        </div>
        <div class="col-md-5">
            <div class="row">
                <div class="col-md-6 no-padding-right">
                   <order-book @sellPriceOrderBookPass="sellPriceOrderBook" @sellAmountOrderBookPass="sellAmountOrderBook" :SelectedSymbol="SelectedSymbol" :pairName="pairName" />
                 
                   <!-- <recent-trades /> -->
                </div>
                <div class="col-md-6">
                    <buy-sell
                     @tradeHistory="tradehistory"
                     @chooseCurrency="getselectedCoin"
                      :sellPrice="SellPrice" :SellAmount="SellAmount" 
                      :SelectedSymbol="SelectedSymbol" :pairName="pairName" 
                      :fullPairName="fullPairName" />
                </div>
            </div>
        </div>
    </div>
  </trade-layout>
</template>

<script>
import TradeLayout from '../layout/TradeLayout.vue'
import TopStatus from '../components/Trade/TopStatus.vue'
import TopChart from '../components/Trade/TopChart.vue'
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
      TopChart,
      OrderHistory
    },
    data() {
      return {
        SellPrice:"",
        SellAmount:"",
        fullPairName: "",

        SelectedSymbol:"",
        pairName:"",

        myTradeHistory:[]

      
      }
    },
    methods: {
        setPairName(fullpair) {
          this.fullPairName = fullpair
          localStorage.setItem("test1", fullpair)
        },

        async sellPriceOrderBook(price){
          this.SellPrice=price
       },

       async sellAmountOrderBook(amount){
          this.SellAmount=amount
       },

        async selectPair(Pair){
          this.pairName=Pair
        // alert(Pair)
        },

        async selectSymbol(symbol){
          this.SelectedSymbol=symbol
        },

        
    }

      
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/Trade/Trade";
</style>