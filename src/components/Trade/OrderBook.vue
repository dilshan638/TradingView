<template>
  <div>
    <div class="trade-box">
      <div class="trade-header">
        Order Book
        <div class="sw-b">
          <div class="box-sm">
            <div class="half">
              <div class="eq"></div>
              <div class="eq"></div>
            </div>
            <div class="half">
              <div class="eql"></div>
            </div>
          </div>
        </div>
        <div class="sw-b"></div>
        <div class="sw-b active"></div>
      </div>
      <div class="trade-body tbl">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Price(USDT)</th>
              <th scope="col">Amount(LDXI)</th>
              <th scope="col" class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sell in priceSellBind" :key="sell">
              <td @click="sellPriceOrderBook(sell[0])">{{ sell[0] }}</td>
              <td>{{ sell[1] }}</td>
              <td class="text-right">{{ sell[0] * sell[1] }}</td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="trade-body tbl">
        <table class="table table-hover special">
        <tbody>
          <tr>
            <td class="success-tst">{{price}}</td>
            <td class="mid">${{price}}</td>
            <td class="text-right"> <div class="read-more">
            <router-link to="/buy-sell-list">More</router-link>
      </div></td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="trade-body tbl">
        <table lass="table table-hover" style="width:100% !important;">
          <tr class="plus" v-for="buy in priceBuyBind" :key="buy">
            <td  @click="sellPriceOrderBook(buy[0])" >{{ buy[0] }}</td>
            <td >{{ buy[1] }}</td>
            <td class="text-right">{{ buy[0] * buy[1] }}</td>
          </tr>
        </table>
      </div>
      
    </div>

    <div class="trade-box">
      <div class="trade-header">Recent Trades</div>
      <div class="trade-body tbl2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Price(USDT)</th>
              <th scope="col">Amount(LDXI)</th>
              <th scope="col" class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recent in recentData" :key="recent">
              <td v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"  @click="sellPriceOrderBook(recent.price)" >
                {{ recent.price }}
              </td>
              <td>{{recent.size}} </td>
              <td class="text-right">{{ recent.price * recent.size }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
    emits: ["sellPriceOrderBookPass"],
  name: "orderbook",
   
  data() {
    return {
      connection: null,
      priceSell: [],
      priceBuy: [],

      dataAl: [],

      priceSellBind: [],
      priceBuyBind: [],

      priceBool: false,
      recentDataLoop: [],
      recentData: [],

      priceBuyUpdate: [],
      fill:"",
      price:"",

   };
  },

  methods: {

  async sellPriceOrderBook(pr){
    this.$emit("sellPriceOrderBookPass", pr)
   
  
  },

    async sendMessage() {
      try {
        this.connection.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: ["BTC-USDT"],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
            token: "",
            //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyMTU4MDQ5LCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.6KW--OvqAjUbVNP6r0b4avksK0R6MBi_FzmYtptDknQ",
          })
        );
      } catch (error) {
        console.log(error);
      }
    },

    async setData(dataSellArray, dataBuyArray, recendData, fillPrice) {
      console.log(dataSellArray)
       if(dataSellArray!=undefined ){
       this.priceSellBind = dataSellArray.sort((a, b) => {return a[0] - b[0] });
    
      }
        if(dataBuyArray !=undefined){
       this.priceBuyBind = dataBuyArray.sort((a, b) => {return b[0] - a[0] });
    
      }
      //   if(recendData !=undefined){
    
    
      // }
      this.recentData = recendData.reverse();
      this.price=fillPrice

    },

    
  },
  mounted() {
   
    this.setData();
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket(
      "ws://34.152.9.147:8002/ws"
    );

    this.connection.onmessage = function (event) {
      console.log(JSON.parse(event.data));
       ts.dataAl = JSON.parse(event.data);

        //Oder Book Page Onload

        if(ts.dataAl.type == "snapshot"){
         
           ts.priceSell = ts.dataAl.asks;
           ts.priceBuy=ts.dataAl.bids
        }


        //Order Book
       if (ts.dataAl.type == "l2update") {

          ts.priceBuyUpdate =[]

        if (ts.dataAl.changes[0][0] == "buy") {
          ts.priceBuyUpdate[0] = ts.dataAl.changes[0][1];
          ts.priceBuyUpdate[1] = ts.dataAl.changes[0][2];
          ts.priceBuyUpdate[2] = 1;

           console.log(ts.priceBuyUpdate);
          ts.priceBuy.push(ts.priceBuyUpdate);
         
        }
        if (ts.dataAl.changes[0][0] == "sell") {
          ts.priceBuyUpdate[0] = ts.dataAl.changes[0][1];
          ts.priceBuyUpdate[1] = ts.dataAl.changes[0][2];
          ts.priceBuyUpdate[2] = 1;

          ts.priceSell.push(ts.priceBuyUpdate);
          console.log(ts.priceBuyUpdate);
        }

       // console.log("Updated Value  " + ts.priceBuy);

      } else {

          
         // Recent Trades //ts.dataAl.type == "order" || ts.dataAl.type == "match" || ***************To Do****************
        if (ts.dataAl.type == "match") {
           
          for (let t = 0; t < 1; t++) {
            ts.recentDataLoop.push(ts.dataAl);
             ts.fill = ts.dataAl.price;
          }
        }
      }
       
      ts.setData(ts.priceSell, ts.priceBuy, ts.recentDataLoop,ts.fill);

      //}
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

.tbl {
   max-height: 165px;
  overflow: hidden;
}

.tbl2{
   max-height: 230px;
  overflow: hidden;
}

.read-more {
  padding: 0;
  float: left;
  width: 100%;
  text-align: right;
  a {
    color: white;
    text-decoration: underline;
  }
}
.buy {
  color: green !important;
}
.sell {
  color: red !important;
}

.table.table-hover.special tr td {
  font-size: 1rem !important;
  font-weight: 500;
}
.mid {
  color: #878787 !important;
}
.success-tst {
  color: #18e140 !important;
}
.td-al{
  margin-left: "30px";
}

</style>