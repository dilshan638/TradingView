<template>
    <trade-chart />
    <button @click="updateData">Update Data</button>
    {{dailyStats}}
    
</template>

<script>
import TradeChart from '../components/Trade/test.vue'
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
  name: "test",
  components: {
    TradeChart,
  },
  data: () => ({
    dailyStats: [],
    yearlyStats: [],
    toggle: true
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
  mounted() {
    fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR")
      .then((res) => res.json())
      .then((res) => {
        console.log("2");
        this.yearlyStats = dataMapper(res.stats);
        console.log("3");
        console.log(this.yearlyStats)
      });

    fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY")
      .then((res) => res.json())
      .then((res) => {
        this.dailyStats = dataMapper(res.stats);
        console.log(this.dailyStats)
      });
  },
};
</script>