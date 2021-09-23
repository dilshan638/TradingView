<template>
  <div class="trade-box">
    <div class="row status1">
      <div class="col-md-3">
        <img src="images/icons/btc@3x.webp" />
        <h3>BTC/USDT</h3>
      </div>
      <div class="col-md-2">
        <h4>{{ marketPrice }}</h4>
        <span class="sub-bottom">$35,988.54</span>
      </div>
      <div class="col-md-7">
        <div class="top-sub">
          <h3>24h Change</h3>
          <b>0.11323</b>
        </div>
        <div class="top-sub">
          <h3>24h Change</h3>
          <b>0.11323</b>
        </div>
        <div class="top-sub">
          <h3>24h Change</h3>
          <b>0.11323</b>
        </div>
        <div class="top-sub">
          <h3>24h Change</h3>
          <b>0.11323</b>
        </div>
        <div class="top-sub">
          <h3>24h Change</h3>
          <b>1,433,454,545.87</b>
        </div>
        <div class="top-sub">
          <h3>MA(7)</h3>
          <b>434234.43</b>
        </div>
        <div class="top-sub">
          <h3>MA(25)</h3>
          <b>434234.43</b>
        </div>
        <div class="top-sub">
          <h3>MA(99)</h3>
          <b>434234.43</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topstatus",

  data() {
    return {
      fill: "",
      dataAl: [],
      marketPrice: "",
    };
  },

  methods: {
    async sendMessage() {
      try {
        this.connection.send(
          JSON.stringify({
            "type":"subscribe",
         "product_ids":["BTC-USDT"],
         "currency_ids":[],
         "channels": [ "order" ] 
          })
        );
      } catch (error) {
        console.log(error);
      }
    },

    async setData(filledPrice) {
      this.marketPrice = filledPrice;
    },
  },
  mounted() {
    this.setData();
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket(
      "ws://17ff-2402-4000-2182-4fac-f197-2d83-22be-2d.ngrok.io/ws"
    );

    this.connection.onmessage = function (event) {
      //console.log(JSON.parse(event.data).type);
      ts.dataAl = JSON.parse(event.data);

      if (ts.dataAl.type == "order" && ts.dataAl.status == "filled") {
        for (let a = 0; a < 1; a++) {
          ts.fill = ts.dataAl.price;
        }
      }

     
      ts.setData(ts.fill);
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      ts.sendMessage();
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Trade/Trade";
</style>