<template>
    <div class="trade-box">
        <div class="row status1">
            <div class="row">
                <div class="col-md-4" style="position:relative">
                    <div class="search-head" @click="dropdownshow = !dropdownshow">
                        <h4>Markets</h4>
                        <i class="ri-arrow-down-s-line" :class="[dropdownshow ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
                    </div>
                    <div class="search-body buysell-form" v-if="dropdownshow">
                        <input class="form-control" placeholder="search" />
                                        <div class="trade-body coins-body bottom-table">
                                            <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                <th scope="col" class="no-border-table-th">Coin</th>
                                                <th scope="col" class="no-border-table-th">Last Price</th>
                                                <th scope="col" class="no-border-table-th text-right">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>    
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>                                                                                                                                                                                            
                                            </tbody>
                                            </table>            
                                        </div>
                    </div>
                </div>
                <div class="col-md-8">
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
        </div>
        <div class="row">
            <div class="col-md-12">
               
            </div>
        </div>
    </div>
</template>

<script>
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
  },
  data: () => ({
    dailyStats: [],
    yearlyStats: [],
    toggle: true,
    dropdownshow: false
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