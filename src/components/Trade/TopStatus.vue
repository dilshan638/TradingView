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
      <div class="col-md-7" >
        <div class="top-sub"  >
          <h3>24h Change</h3>
          <b  >1234</b>
        </div>
        <div class="top-sub" >
          <h3>24h High</h3>
          <b  >{{open24h}}</b>
        </div>
        <div class="top-sub"  >
          <h3 >24h Low</h3>
          <b >{{low24h}}</b>
        </div>
        <div class="top-sub" >
          <h3 >24h Volume(LDXI)</h3>
          <b  ></b>
        </div>
        <div class="top-sub"  >
          <h3>24h Volume( USDT )</h3>
          <b >{{volume24h}}</b>
        </div>
        <!-- <div class="top-sub">
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
        </div> -->
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

     
      open24h:"",
      low24h:"",
      volume24h:""
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
             "channels": [ "order", "ticker" ] 
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
    this.connection = new WebSocket( "ws://e9b7-2402-4000-2281-4a16-2ca6-a022-3c15-29e1.ngrok.io/ws");

    this.connection.onmessage = function (event) {
     ts.dataAl = JSON.parse(event.data);

    
      if (ts.dataAl.type == "order" && ts.dataAl.status == "filled") {
        for (let a = 0; a < 1; a++) {
          ts.fill = ts.dataAl.price;
        }
      }

      if(ts.dataAl.type == "ticker"){
        ts.open24h=ts.dataAl.open24h
        ts.low24h=ts.dataAl.low24h
        ts.volume24h=ts.dataAl.volume24h
     
     console.log(ts.open24h)
      console.log(ts.low24h)
       console.log(ts.volume24h)
        
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