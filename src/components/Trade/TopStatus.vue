<template>
    <div class="trade-box">
        <div class="row status1">
        <div class="col-md-4 pos-rel">
          <div class="search-head" @click="dropdownshow = !dropdownshow">
              <h4></h4>
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
                        <tr v-for="marketprice in coindata" :key="marketprice.coin">
                            <td @click="selectcoin(this.coin)">{{ marketprice.pair_name }}</td>
                            <td @click="selectcoin(this.coin)">{{ marketprice.price }}</td>
                            <td @click="selectcoin(this.coin)" class="text-right success-text">{{marketprice.change_24h}}%</td>
                        </tr>                                                                                                                                                                                           
                    </tbody>
                  </table>            
              </div>
          </div>
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
      </div>
    </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import axios from 'axios';
export default {
  name: "topstatus",

  data() {
    return {
      dropdownshow: false,
      coindata: [],

      fill: "",
      dataAl: [],
      marketPrice: "",

      selectedcoin: "",
      coin: "",
      lastprice: "",
      priceChanege: "",

     
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
    async getMarketDropdown() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };           
       axios.get("https://dapi.exus.live/api/mobile/v1/dashboard/summary/GBP?volume_24h=desc", {headers: headers})
        .then((res) => {
        this.coindata =  res.data;
        console.log(this.coindata); 

        for (let i = 0; i < this.coindata.length; i++) {
            this.coin = this.coindata[i].pair_name;
            this.lastprice = this.coindata[i].price;
            this.priceChanege = this.coindata[i].change_24h;
        }

        })
        .catch(function (error) {
          console.log(error);
         })
    },
    async setData(filledPrice) {
      this.marketPrice = filledPrice;
    },
    async selectcoin(coin) {
      this.selectedcoin = coin
    }
  },
  mounted() {
    this.setData();
    this.getMarketDropdown();
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