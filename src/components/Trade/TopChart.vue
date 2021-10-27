<template>
    <div class="trade-box">
        <!-- <div class="row status1">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="chart-stat">
                                <b>05/07/20210</b>
                            </div>
                            <div class="chart-stat">
                                <b>O:</b>
                                <span>31,434</span>
                            </div>
                            <div class="chart-stat">
                                <b>H:</b>
                                <span>32,3232</span>
                            </div>     
                            <div class="chart-stat">
                                <b>L</b>
                                <span>434434</span>
                            </div>        
                            <div class="chart-stat">
                                <b>C</b>
                                <span>0.62%</span>
                            </div>
                            <div class="chart-stat">
                                <b>Change</b>
                                <span>0.62%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>AMPLITUDE</b>
                                <span>1.55%</span>
                            </div>    
                            <div class="chart-stat">
                                <b>MA(7)</b>
                                <span class="pink-color">1.55%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>MA(27)</b>
                                <span class="error-text">1.55%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>AMPLITUDE</b>
                                <span class="light-blue">1.55%</span>
                            </div>                                                                                                                                         
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row">
            <div class="col-md-12">
                <!-- <img src="images/logo/chart.jpeg" class="img-responsive" /> -->
                <div class="hello">
                  <VueTradingView :options="{
                    symbol: 'NASDAQ:AAPL',
                    theme: 'dark',
                    autosize: true
                  }" />
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/vue-trading-view';

const dataMapper = (data) =>
  [
    { name: "ETH", prop: "coinsPerHour" },
    { name: "BTC", prop: "btcPerHour" },
  ].map((o) => ({
    name: o.name,
    data: data.map((i) => [i.time * 1e3, i[o.prop]]),
    animation: false,
  }));

export default {
  name: "App",
  components: {
    VueTradingView
  },
  data: () => ({
    dailyStats: [],
    yearlyStats: [],
    toggle: true,
  }),
  computed: {
    series() {
      return this.toggle ? this.yearlyStats : this.dailyStats;
    },
  },
  methods: {
    updateData() {
      this.toggle = !this.toggle;
    },
  },
  created() {
    fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR")
      .then((res) => {
          console.log(res.stat)
      })

    fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY")
      .then((res) => res.json())
      .then((res) => {
        this.dailyStats = dataMapper(res.stats);
      });
  },
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>