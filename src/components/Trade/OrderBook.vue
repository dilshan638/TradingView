<template>
  <div>
    <div class="trade-box">
      <div class="trade-header">
        Order Book
        <select class="form-control sel-val" @change="onChange($event)">
          <option value="0.01">0.01</option>
          <option value="0.1">0.1</option>
          <option value="0">1</option>
        </select>
        <div
          class="sw-b"
          @click="activebuy"
          v-bind:class="[buytab ? 'active' : '']"
          title="Buy"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eql green-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
        <div
          class="sw-b"
          @click="activesell"
          v-bind:class="[selltab ? 'active' : '']"
          title="Sell"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eql red-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
        <div
          class="sw-b"
          @click="activebuysell"
          v-bind:class="[buyselltab ? 'active' : '']"
          title="Buy and Sell"
        >
          <div class="box-sm">
            <div class="half">
              <div class="eq red-bg"></div>
              <div class="eq green-bg"></div>
            </div>
            <div class="half">
              <div class="eql blue-bg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-title">
        <div class="trade-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Price({{ pairName }})</th>
                <th scope="col">Amount({{ SelectedSymbol }})</th>
                <th scope="col" class="text-right">Total</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="top-order-book">
        <div
          class="trade-body sell-body"
          v-if="showbuyandsell == true || showsell == true"
          v-bind:class="[showsell ? 'sell-full' : '']"
        >
          <table class="table table-hover">
            <tbody v-if="limitRows">
              <tr
                v-for="sell in priceSellBind.slice(0, 11)"
                :key="sell"
                v-show="deci == '0.01'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(2) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                  <transition name="fade">
                    <div class="tooltip2">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[3]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[4]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
              <tr
                v-for="sell in priceSellBind.slice(0, 11)"
                :key="sell"
                v-show="deci == '0.1'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(1) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                </td>
              </tr>

              <tr
                v-for="sell in priceSellBind.slice(0, 11)"
                :key="sell"
                v-show="deci == '0'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(0) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                </td>
              </tr>
            </tbody>

             <tbody v-else>
              <tr
                v-for="sell in priceSellBind"
                :key="sell"
                v-show="deci == '0.01'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(2) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                  <transition name="fade">
                    <div class="tooltip2">
                      <div class="tool-row">
                        <div class="tool-title">Avg Price:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[0]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[3]).toFixed(5) }}
                        </div>
                      </div>
                      <div class="tool-row">
                        <div class="tool-title">Sum {{ pairName }}:</div>
                        <div class="tool-val">
                          {{ parseFloat(sell[4]).toFixed(5) }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </td>
              </tr>
              <tr
                v-for="sell in priceSellBind"
                :key="sell"
                v-show="deci == '0.1'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(1) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                </td>
              </tr>

              <tr
                v-for="sell in priceSellBind"
                :key="sell"
                v-show="deci == '0'"
              >
                <td @click="sellPriceOrderBook(sell[0])">
                  {{ parseFloat(sell[0]).toFixed(0) }}
                </td>
                <td @click="amountOrderBook(sell[1])">
                  {{ parseFloat(sell[1]).toFixed(5) }}
                </td>
                <td class="text-right">
                  {{ parseFloat(sell[0] * sell[1]).toFixed(5) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="trade-body middle-bdy">
          <table class="table table-hover special">
            <tbody>
              <tr v-show="price != ''">
                <td v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']">
                  {{ price }}
                </td>
                <td class="mid">${{ price }}</td>
                <td class="text-right">
                  <div class="read-more">
                    <router-link to="/buy-sell-list">More</router-link>
                  </div>
                </td>
              </tr>
              <tr v-show="price == ''">
                <td v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']">
                  {{ matchPriceMATCH }}
                </td>
                <td class="mid">${{ matchPriceMATCH }}</td>
                <td class="text-right">
                  <div class="read-more">
                    <router-link to="/buy-sell-list">More</router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="trade-body buy-body"
          v-if="showbuyandsell == true || showbuy == true"
          v-bind:class="[showbuy ? 'buy-full' : '']"
        >
          <table lass="table table-hover" style="width: 100% !important" v-if="limitRows">
            <tr
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0.01'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(2) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}

                <transition name="fade">
                  <div class="tooltip2">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0.1'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(1) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind.slice(0, 11)"
              :key="buy"
              v-show="deci == '0'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(0) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
              </td>
            </tr>
          </table>

          <table lass="table table-hover" style="width: 100% !important" v-else>
            <tr
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0.01'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(2) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}

                <transition name="fade">
                  <div class="tooltip2">
                    <div class="tool-row">
                      <div class="tool-title">Avg Price:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[0]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ SelectedSymbol }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[3]).toFixed(5) }}
                      </div>
                    </div>
                    <div class="tool-row">
                      <div class="tool-title">Sum {{ pairName }}:</div>
                      <div class="tool-val">
                        {{ parseFloat(buy[4]).toFixed(5) }}
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0.1'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(1) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
              </td>
            </tr>

            <tr
              class="plus"
              v-for="buy in priceBuyBind"
              :key="buy"
              v-show="deci == '0'"
            >
              <td @click="sellPriceOrderBook(buy[0])">
                {{ parseFloat(buy[0]).toFixed(0) }}
              </td>
              <td @click="amountOrderBook(buy[1])">
                {{ parseFloat(buy[1]).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(buy[0] * buy[1]).toFixed(5) }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="trade-box">
      <div class="trade-header">Recent Trades</div>
      <div class="top-title">
        <div class="trade-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Price({{ pairName }})</th>
                <th scope="col">Amount({{ SelectedSymbol }})</th>
                <th scope="col" class="text-right">Total</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="top-order-book recent">
        <div class="trade-body recent-body">
          <table lass="table table-hover" style="width: 100% !important">
            <tr
              v-for="recent in recentData"
              :key="recent"
              v-show="deci == '0.01'"
            >
              <td
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
                @click="sellPriceOrderBook(recent.price)"
              >
                {{ parseFloat(recent.price).toFixed(2) }}
              </td>
              <td @click="amountOrderBook(recent.size)">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(recent.price * recent.size).toFixed(5) }}
              </td>
            </tr>

            <tr
              v-for="recent in recentData"
              :key="recent"
              v-show="deci == '0.1'"
            >
              <td
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
                @click="sellPriceOrderBook(recent.price)"
              >
                {{ parseFloat(recent.price).toFixed(1) }}
              </td>
              <td @click="amountOrderBook(recent.size)">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(recent.price * recent.size).toFixed(5) }}
              </td>
            </tr>

            <tr v-for="recent in recentData" :key="recent" v-show="deci == '0'">
              <td
                v-bind:class="[recent.side == 'buy' ? 'buy' : 'sell']"
                @click="sellPriceOrderBook(recent.price)"
              >
                {{ parseFloat(recent.price).toFixed(0) }}
              </td>
              <td @click="amountOrderBook(recent.size)">
                {{ parseFloat(recent.size).toFixed(5) }}
              </td>
              <td class="text-right">
                {{ parseFloat(recent.price * recent.size).toFixed(5) }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ["sellPriceOrderBookPass", "sellAmountOrderBookPass"],
  name: "orderbook",
  components: {},
  props: ["SelectedSymbol", "pairName"],

  data() {
    return {
      buyselltab: true,
      selltab: false,
      buytab: false,
      showbuyandsell: true,
      showbuy: false,
      showsell: false,

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
      fill: "",
      price: "",
      deci: "0.01",
      reentDataOnLoad: [],

      buyTotal: 0,
      sellTotal: 0,

      buyAmount: 0,
      avgBuy: "",
      sumAmount: 0,
      sumTotal: "",

      selAmount: 0,
      matchFill: "",
      matchPriceMATCH: "",

      sellTest:false,
    //  activebuysellArraySell:[],

     // priceSellBindSellCon:[]

     limitRows:true
     

    };
  },

  methods: {
    async onChange(event) {
      this.deci = event.target.value;
    },
    async selectedSymbol(SelectedSymbol) {
      this.symbol = SelectedSymbol;
    },
    async sellPriceOrderBook(value) {
      this.$emit("sellPriceOrderBookPass", value);
    },
    async amountOrderBook(amount) {
      this.$emit("sellAmountOrderBookPass", amount);
    },

    async closeModalDetail() {
      this.$refs.roedetails.closeModal();
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
    //  async setData(dataSellArray, dataBuyArray, recendData, fillPrice) {
    async setData(dataSellArray, dataBuyArray, fillPrice) {
      if (dataSellArray != undefined) {
      
       this.priceSellBind = dataSellArray;
      

      
          this.priceSellBind.sort((a, b) => {
            return b[0] - a[0];
          });
          for (let z = 11; z > 0; z--) {
            this.buyAmount += parseFloat(this.priceSellBind[z][1]);
            this.priceSellBind[z][3] = this.buyAmount;
            this.buyTotal += parseFloat(this.priceSellBind[z][0]) * parseFloat(this.priceSellBind[z][1]);
            this.priceSellBind[z][4] = this.buyTotal;
          }

          
           if (this.priceSellBind.length > 11)
          {
                this.priceSellBind.shift();
           }
       

      }

      if (dataBuyArray != undefined) {
        this.priceBuyBind = dataBuyArray;
         this.priceBuyBind = dataBuyArray.sort((a, b) => {
          return b[0] - a[0];
        });
        for (let a = 0; a <= this.priceBuyBind.length; a++) {
          this.selAmount += parseFloat(this.priceBuyBind[a][1]);
          this.priceBuyBind[a][3] = this.selAmount;
          this.sellTotal += parseFloat(this.priceBuyBind[a][0]) * parseFloat(this.priceBuyBind[a][1]);
          this.priceBuyBind[a][4] = this.sellTotal;
        }
         if (this.priceBuyBind.length > 11) {
        this.priceBuyBind.shift();
      }
       
      }
     

      this.price = fillPrice;
    },
    async activebuysell() {
      this.buyselltab = true;
      this.selltab = false;
      this.buytab = false;

      this.showbuyandsell = true;
      this.showbuy = false;
      this.showsell = false;

      this.limitRows=true
    },
    async activesell() {
      this.selltab = true;
      this.buyselltab = false;
      this.buytab = false;

     this.showbuyandsell = false;
      this.showbuy = false;
      this.showsell = true;

      this.sellTest=true
      this.limitRows=false

      
    },
    async activebuy() {
      this.buytab = true;
      this.buyselltab = false;
      this.selltab = false;

      this.showbuyandsell = false;
      this.showbuy = true;
      this.showsell = false;

      this.limitRows=false
    },
  },
  mounted() {
    this.setData();
    this.activebuysell()
    this.matchPriceMATCH = localStorage.getItem("matchPriceMATCH");
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket("ws://34.152.9.147:8002/ws");

    this.connection.onmessage = function (event) {
      ts.dataAl = JSON.parse(event.data);

      //Oder Book Page Onload

      if (ts.dataAl.type == "snapshot") {
        ts.priceSell = ts.dataAl.asks;
        ts.priceBuy = ts.dataAl.bids;
     
      }

      if (ts.dataAl.type == "l2update") {
        ts.priceSell = [];
        ts.priceBuy = [];
        ts.activebuysellArraySell=[]
        ts.priceSell = ts.dataAl.asks;
        ts.priceBuy = ts.dataAl.bids;

   
      } else {
        // Recent Trades //ts.dataAl.type == "order" || ts.dataAl.type == "match" || ***************To Do****************

        if (ts.dataAl.type == "match") {
          ts.fill = ts.dataAl.price;
          ts.matchFill = ts.dataAl.side;

          localStorage.setItem("matchPriceMATCH", ts.dataAl.price);
        }
      }

      const headers = {
        "Content-Type": "application/json",
      };

      axios
        .get("http://34.152.9.147:8001/api/products/BTC-USDT/trades", {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);

          if (ts.recentData.length != 0) {
            ts.recentData = [];
          }
          for (let b = 0; b < response.data.length; b++) {
            ts.recentData.push({
              side: response.data[b].side,
              size: response.data[b].size,
              price: response.data[b].price,
            });
          }

          console.log(ts.recentData);
        })
        .catch(function (error) {
          console.log(error);
        });

      ts.setData(ts.priceSell, ts.priceBuy, ts.fill);
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
  color: #18e140 !important;
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
.td-al {
  margin-left: "30px";
}
</style>