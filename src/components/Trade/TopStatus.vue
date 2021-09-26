<template>
  <div class="trade-box">
    <div class="row status1">
      <div class="col-md-3">
        <img src="images/icons/btc@3x.webp" />
        <h3>BTC/USDT</h3>
      </div>
      <div class="col-md-2">
        <h4>{{marketPrice}}</h4>
        <span class="sub-bottom">$35,988.54</span>
      </div>
      <div class="col-md-7" >
        <div class="top-sub"  >
          <h3>24h Change</h3>
          <b  >{{volume24hBind}}</b>
        </div>
        <div class="top-sub" >
          <h3>24h High</h3>
          <b  >{{open24hBind}}</b>
        </div>
        <div class="top-sub"  >
          <h3 >24h Low</h3>
          <b >{{low24hBind}}</b>
        </div>
        <div class="top-sub" >
          <h3 >24h Volume(LDXI)</h3>
          <b v-bind:class="[ldcx24hBind <0? 'sell' : 'buy']">{{parseFloat(ldcx24hBind).toFixed(2)}} %</b>
        </div>
        <div class="top-sub"  >
          <h3>24h Volume(USDT)</h3>
          <b >{{volume24hBind}}</b>
        </div>
        <!-- <div class="top-sub">
          <h3>MA(7)</h3>
          <b>434234.43</b>
        </div>
        <div class="top-sub" >
          <h3 >24h Volume(LDXI)</h3>
          <b  ></b>
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
      volume24h:"",

      open24hBind:"",
      low24hBind:"",
      volume24hBind:"",
      
      ldcx24h:"",
      ldcx24hBind:"",

      tickerPrice:"",

      
      
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

    async setData(filledPrice,open24hBnd,low24hBnd,volume24hBnd,ldcx24hBnd) {
        this.marketPrice = filledPrice
        this.open24hBind = open24hBnd;
        this.low24hBind = low24hBnd;
         this.volume24hBind = volume24hBnd;
         this.ldcx24hBind=ldcx24hBnd
        
    },
  },
  mounted() {
    this.setData();
    
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket( "ws://716e-2402-4000-2382-7a26-b268-54fd-e8c0-47e1.ngrok.io/ws");

    this.connection.onmessage = function (event) {
     ts.dataAl = JSON.parse(event.data);

    
      // if (ts.dataAl.type == "order" || ts.dataAl.status == "filled" ||ts.dataAl.status == "ticker" ) {
      //   // for (let a = 0; a < 1; a++) {
      //   //   ts.fill = ts.dataAl.price;
      //   // }
      // }

      if(ts.dataAl.type == "ticker"){
        for (let a = 0; a < 1; a++) {
          ts.fill = ts.dataAl.price;
        }
        ts.tickerPrice=ts.dataAl.price
        ts.open24h=ts.dataAl.open24h
        ts.low24h=ts.dataAl.low24h
        ts.volume24h=ts.dataAl.volume24h
       
      }

      if(ts.tickerPrice==0){
         ts.ldcx24h==0
      }else{
          ts.ldcx24h=((ts.tickerPrice- ts.open24h)/ts.tickerPrice )* 100
      }
    
      ts.setData(ts.fill, ts.open24h,ts.low24h, ts.volume24h, ts.ldcx24h);
      console.log(ts.fill)
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

 .buy{
    color: green !important;
  }
  .sell{
    color:red !important;
  }
</style>