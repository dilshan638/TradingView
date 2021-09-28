
<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card table-card">
          <div class="card-header card-head-30">
            <div class="row">
              <div class="col-md-6 breadcrum">
                <h2>
                  <router-link to="/trade" class="sm-text"
                    >Exchange</router-link
                  >
                </h2>
                <i class="ri-arrow-right-s-line"></i>
                <h2>Order Book</h2>
                <div class="sub-trade-row">
                  <h3>Wallet Balances</h3>
                  <h3>BTC/USDT</h3>
                </div>
              </div>
              <div class="col-md-6 breadcrum">
                <div class="row">
                  <div class="col-md-6"></div>
                  <div class="col-md-2">
                    <div class="top-select">
                      <h5>Depth</h5>
                      <select class="form-control" @change="changeDepth($event)">
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="top-select">
                      <h5>Group</h5>
                      <select class="form-control"   @change="onChange($event)">
                        <option value="2">2 Decimals</option>
                        <option value="3"> 3 Decimals</option>
                        <option value="4">4 Decimals</option>
                        <option value="5">5 Decimals</option>
                        <option value="6">6 Decimals</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="trade-box landing-trade">
                  <div class="trade-header">Buy Order</div>
                  <div class="trade-body">
                    <div class="table-responsive">
                      <table class="table table-hover tbl">
                        <thead>
                          <tr>
                           
                            <th scope="col">Price(USDT)</th>
                            <th scope="col">Amount(LDXI)</th>
                            <th scope="col" class="text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr class="plus" v-for="buy in priceBuyBind.slice(0, this.depth)" :key="buy" v-show="deci=='2'" >
                           
                            <td>{{parseFloat(buy[0]).toFixed(2)}}</td>
                            <td>{{parseFloat(buy[1]).toFixed(2)}}</td>
                            <td class="text-right">{{parseFloat(buy[0] * buy[1]).toFixed(2) }}</td>
                          </tr>

                          <tr class="plus" v-for="buy in priceBuyBind" :key="buy" v-show="deci=='3'">
                            <td>{{parseFloat(buy[0]).toFixed(3)}}</td>
                            <td>{{parseFloat(buy[1]).toFixed(3)}}</td>
                             <td class="text-right">{{parseFloat(buy[0] * buy[1]).toFixed(3) }}</td>
                         </tr>

                          <tr class="plus" v-for="buy in priceBuyBind" :key="buy" v-show="deci=='4'">
                            <td>{{parseFloat(buy[0]).toFixed(4)}}</td>
                            <td>{{parseFloat(buy[1]).toFixed(4)}}</td>
                              <td class="text-right">{{parseFloat(buy[0] * buy[1]).toFixed(4) }}</td>
                        </tr>

                            <tr class="plus" v-for="buy in priceBuyBind" :key="buy" v-show="deci=='5'">
                            <td>{{parseFloat(buy[0]).toFixed(5)}}</td>
                            <td>{{parseFloat(buy[1]).toFixed(5)}}</td>
                            <td class="text-right">{{parseFloat(buy[0] * buy[1]).toFixed(5) }}</td>
                           </tr>

                            <tr class="plus" v-for="buy in priceBuyBind" :key="buy" v-show="deci=='6'">
                            <td>{{parseFloat(buy[0]).toFixed(6)}}</td>
                            <td>{{parseFloat(buy[1]).toFixed(6)}}</td>
                            <td class="text-right">{{parseFloat(buy[0] * buy[1]).toFixed(6) }}</td>
                          </tr>



                         
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="trade-box landing-trade">
                  <div class="trade-header">Sell Order</div>
                  <div class="trade-body">
                    <div class="table-responsive">
                      <table class="table table-hover tbl">
                        <thead>
                          <tr>
                            
                            <th scope="col">Price(USDT)</th>
                            <th scope="col">Amount(LDXI)</th>
                            <th scope="col" class="text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>

                           <tr v-for="sell in priceSellBind.slice(0, this.depth)" :key="sell" v-show="deci=='2'">
                            
                            <td>{{parseFloat(sell[0]).toFixed(2)}}</td>
                            <td>{{parseFloat(sell[1]).toFixed(2)}}</td>
                             <td class="text-right">{{parseFloat(sell[0] * sell[1]).toFixed(2) }}</td>
                        </tr>
                          <tr v-for="sell in priceSellBind" :key="sell" v-show="deci=='3'">
                            <td>{{parseFloat(sell[0]).toFixed(3)}}</td>
                            <td>{{parseFloat(sell[1]).toFixed(3)}}</td>
                                <td class="text-right">{{parseFloat(sell[0] * sell[1]).toFixed(3) }}</td>
                       </tr>
                           <tr v-for="sell in priceSellBind" :key="sell" v-show="deci=='4'">
                            <td>{{parseFloat(sell[0]).toFixed(4)}}</td>
                            <td>{{parseFloat(sell[1]).toFixed(4)}}</td>
                               <td class="text-right">{{parseFloat(sell[0] * sell[1]).toFixed(4) }}</td>
                        </tr>
                           <tr v-for="sell in priceSellBind" :key="sell" v-show="deci=='5'">
                            <td>{{parseFloat(sell[0]).toFixed(5)}}</td>
                            <td>{{parseFloat(sell[1]).toFixed(5)}}</td>
                               <td class="text-right">{{parseFloat(sell[0] * sell[1]).toFixed(5) }}</td>
                       </tr>
                           <tr v-for="sell in priceSellBind" :key="sell" v-show="deci=='6'">
                            <td>{{parseFloat(sell[0]).toFixed(6)}}</td>
                            <td>{{parseFloat(sell[1]).toFixed(6)}}</td>
                              <td class="text-right">{{parseFloat(sell[0] * sell[1]).toFixed(6) }}</td>
                        </tr>


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "../../layout/DefaultLayout.vue";
export default {
  name: "BuyAndSellList",
  components: {
    DefaultLayout,
  },

  data() {
    return {
      priceBuyBind: [],
      priceBuy: [],
      dataAl: [],
      depth: 15,

      priceSell: [],
      priceSellBind: [],

      test: [
        ["100", "200.123", "300.1234"],
        ["400.33", "500.43445", "600.5656"],
        ["99.4545436", "199.5656", "299.557"],
        ["9.566", "8.565", "10000.565"],
      ],

      deci:"2"
    };
  },

  methods: {

    async onChange(event){
      this.deci=event.target.value
    },
    async changeDepth(event){
      this.depth = event.target.value
    },    
    async sendMessage() {
      try {
        this.connection.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: ["BTC-USDT"],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
            // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyMTU4MDQ5LCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.6KW--OvqAjUbVNP6r0b4avksK0R6MBi_FzmYtptDknQ"
          })
        );
      } catch (error) {
        console.log(error);
      }
    },

    async setData(dataBuyArray, dataSellArray) {
      this.priceBuyBind = dataBuyArray.sort((a, b) => {return a[0] - b[0] });
      this.priceSellBind = dataSellArray.sort((a, b) => {return b[0] - a[0] });

      
    },
  },
  mounted() {
    this.setData();
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket(
      "ws://54a2-2402-4000-2380-f223-b1f4-2b94-3df9-310.ngrok.io/ws"
    );

    this.connection.onmessage = function (event) {
      console.log(JSON.parse(event.data));
      ts.dataAl = JSON.parse(event.data);

      // ts.priceBuy = ts.dataAl.bids;
      // ts.priceSell = ts.dataAl.asks;

      if (ts.dataAl.type == "snapshot") {
        ts.priceSell = ts.dataAl.asks;
        ts.priceBuy = ts.dataAl.bids;
      }

      ts.setData(ts.priceBuy, ts.priceSell);
     
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