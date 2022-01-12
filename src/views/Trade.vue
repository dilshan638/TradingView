<template>
  <trade-layout>
    <div class="row">
      <div class="col-md-12 no-padding-right">
        <top-status
          @symbol="selectSymbol"
          @pair_name="selectPair"
          @full_pair_name="setPairName"
        />
        <top-chart :fullPairName="fullPairName" />
        <order-history />
      </div>
    </div>
  </trade-layout>
</template>

<script>
import TradeLayout from "../layout/TradeLayout.vue";
import TopStatus from "../components/Trade/TopStatus.vue";
import TopChart from "../components/Trade/TopChart.vue";

export default {
  name: "trade",
  components: {
    TradeLayout,
    TopStatus,
    TopChart,
  },
  data() {
    return {
      SellPrice: "",
      SellAmount: "",
      fullPairName: "",
      SelectedSymbol: "",
      pairName: "",
      myTradeHistory: [],
    };
  },
  methods: {
    setPairName(fullpair) {
      this.fullPairName = fullpair;
    },

    async sellPriceOrderBook(price, amount) {
      this.SellPrice = price;
      this.amount2 = amount;
    },

    async sellAmountOrderBook(amount) {
      this.SellAmount = amount;
    },

    async selectPair(Pair) {
      this.pairName = Pair;
    },

    async selectSymbol(symbol) {
      this.SelectedSymbol = symbol;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/Trade/Trade";
</style>