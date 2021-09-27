<template>
  <div class="trade-box">
    <div class="row status1">
      <div class="col-md-4 pos-rel">
        <div class="search-head" @click="dropdownshow = !dropdownshow">
            <img :src="selectedcoinimage" /> <h4>{{selectedcoin}}</h4>
            <i class="ri-arrow-down-s-line" :class="[dropdownshow ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
        </div>
        <div class="search-body buysell-form" v-if="dropdownshow">
          <!-- <input class="form-control" placeholder="search" /> -->
          <div class="trade-body coins-body bottom-table">
              <table class="table table-hover coins-table">
                <thead>
                    <tr>
                    <th scope="col" class="no-border-table-th">Coin</th>
                    <th scope="col" class="no-border-table-th">Last Price</th>
                    <th scope="col" class="no-border-table-th text-right">Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="marketprice in coindata" :key="marketprice.coin">
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image)">{{ marketprice.pair_name }}</td>
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image)">{{ marketprice.price }}</td>
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image)" class="text-right success-text">{{marketprice.change_24h}}%</td>
                    </tr>                                                                                                                                                                                           
                </tbody>
              </table>            
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <h4>{{marketPrice}}</h4>
        <span class="sub-bottom">$35,988.54</span>
      </div>
      <div class="col-md-6" >
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
      fill: "",
      dataAl: [],
      marketPrice: "",
      dropdownshow: false,

      selectedcoin: "BTC/USDC",
      selectedcoinimage: "https://ldev.exus.live/public/frontend/images/currency/btc_icon.png",
      coin: "",
      lastprice: "",
      priceChanege: "",   
      
      cryptoAll: [],
     
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
    async selectcoin(pair_name , image) {      
      this.selectedcoin = pair_name;
      this.selectedcoinimage = image;
      this.setCoin();
    },
    async setCoin() {
      localStorage.setItem("selectedmainCoin", this.selectedcoin)
      console.log(localStorage.getItem("selectedmainCoin"))
    }    

  },
  mounted() {
    this.setData();
    this.getMarketDropdown();
    this.setCoin();
    
  },
  created: function () {
    const ts = this;
    this.connection = new WebSocket( "ws://e492-2402-4000-2380-f223-b1f4-2b94-3df9-310.ngrok.io/ws");

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