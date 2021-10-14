<template>
  <div class="trade-box" style="min-height: auto;">
    <!-- trade comoponents -->
    <div class="row status1">
      <div class="col-md-3 pos-rel">
        <div class="search-head" @click="dropdownshow = !dropdownshow" @blur="dropdownshow = false">
            <img :src="selectedcoinimage" /> <h4>{{defaultCoin}}</h4>
            <i class="ri-arrow-down-s-line" :class="[dropdownshow ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
        </div>
        <div class="search-body buysell-form" v-if="dropdownshow">
          <input class="form-control search-input" placeholder="search" v-model="searchcoin" />
          <div class="trade-body coins-body bottom-table" @click="dropdown">
              <table class="table table-hover coins-table">
                <thead>
                    <tr>
                    <th scope="col" class="no-border-table-th">Coin</th>
                    <th scope="col" class="no-border-table-th">Last Price</th>
                    <th scope="col" class="no-border-table-th text-right">Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="marketprice in filterCoins" :key="marketprice.coin">
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image, marketprice.currency, marketprice)">{{ marketprice.pair_name }}</td>
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image, marketprice.currency)">{{ marketprice.price }}</td>
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image, marketprice.currency)" class="text-right success-text">{{marketprice.change_24h}}%</td>
                    </tr>                                                                                                                                                                                           
                </tbody>
              </table>
          </div>
        </div>
      </div>
      <div class="col-md-9">

        <div class="innertop" v-show="marketPrice != undefined">
          <h4 v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']">{{marketPrice}}</h4>
          <span class="sub-bottom">${{marketPrice}}</span>          
        </div>

        <div class="innertop" v-show="marketPrice == undefined">
          <h4 v-bind:class="[matchFill == 'buy' ? 'buy' : 'sell']">{{matchPriceMATCH}}</h4>
          <span class="sub-bottom">${{matchPriceMATCH}}</span>          
        </div>

        <div class="innertop">
          <div class="top-sub">
            <h3>24h Change</h3>
            <b  >{{volume24hBind}}</b>
          </div>          
        </div>

        <div class="innertop">
          <div class="top-sub" >
            <h3>24h High</h3>
            <b  >{{open24hBind}}</b>
          </div>          
        </div>

        <div class="innertop">
          <div class="top-sub" >
            <h3>24h High</h3>
            <b  >{{open24hBind}}</b>
          </div>          
        </div>

        <div class="innertop">
          <div class="top-sub"  >
            <h3 >24h Low</h3>
            <b >{{low24hBind}}</b>
          </div>         
        </div>

        <div class="innertop">
          <div class="top-sub" >
            <h3 >24h Volume(LDXI)</h3>
            <b v-bind:class="[ldcx24hBind <0? 'sell' : 'buy']">{{parseFloat(ldcx24hBind).toFixed(2)}} %</b>
          </div>         
        </div>  

        <div class="innertop">
          <div class="top-sub"  >
            <h3>24h Volume(USDT)</h3>
            <b >{{volume24hBind}}</b>
          </div>        
        </div>                               
      </div>
    </div> 
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import axios from 'axios';
export default {
   emits: ["symbol","pair_name", "full_pair_name"],
  name: "topstatus",
  data() {
    return {
      fill: "",
      dataAl: [],
      marketPrice: "",
      dropdownshow: false,
      searchcoin: '',
      defaultCoin: "",

      selectedcoin: "",
      selectedcoinimage: "",
      selectedcurrency: "BTC",
      dafaultcoinimage: "",
      coin: "",
      lastprice: "",
      priceChanege: "",   
      moneyCoin: "",
      
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
      matchFill:"",
      matchPriceMATCH:""

      
      
    };
  },

  methods: {
    setMainCoin() {
      if(localStorage.getItem("selectedmainCoin")!=null){
          this.defaultCoin = localStorage.getItem("selectedmainCoin");
          this.selectedcoinimage = localStorage.getItem("selectedcoinimage");

           this.$emit("symbol", this.defaultCoin.substring(0, this.defaultCoin.lastIndexOf('/')))
           this.$emit("pair_name", this.defaultCoin.substring(this.defaultCoin.lastIndexOf("/") + 1))
      }
      else{
          this.defaultCoin = "BTC/USDC";
           this.$emit("symbol", "BTC")
           this.$emit("pair_name", "USDC")
      }
    },
    async sendMessage() {
      try {
        this.connection.send(
          JSON.stringify({
            "type":"subscribe",
             "product_ids":["BTC-USDT"],
             "currency_ids":[],
             "channels": [ "order", "ticker","match" ]
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
           
         if(ldcx24hBnd==undefined ||ldcx24hBnd==0){
             this.ldcx24hBind=0
         }else{
            this.ldcx24hBind=((filledPrice-open24hBnd)/ open24hBnd)*100
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
      
        for (let i = 0; i < this.coindata.length; i++) {
            this.coin = this.coindata[i].pair_name.toLowerCase();
            this.lastprice = this.coindata[i].price;
            this.priceChanege = this.coindata[i].change_24h;
        }
        for (let i = 0; i < this.coindata.length; i++) {
          if(this.defaultCoin == "BTC/USDC") {
            this.selectedcoinimage = this.coindata[i].image;
          }
        }        
      })
        .catch(function (error) {
          console.log(error);
         })
    },
    async selectcoin(pair_name , image, currency) {
      this.dropdownshow = false;   
      this.selectedcoin = pair_name;
      this.selectedcoinimage = image;
      this.selectedcurrency = currency;
      localStorage.setItem("selectedmainCoin", pair_name)
      localStorage.setItem("selectedcoinimage", image)
      this.setCoin();
      this.setMainCoin();
      this.$emit("symbol", currency)
      this.$emit("pair_name", pair_name.substring(pair_name.lastIndexOf("/") + 1))
      this.$emit("full_pair_name", pair_name)

    
     

    },
    async setCoin() {
      localStorage.setItem("selectedmainCurrency", this.selectedcurrency)
      this.selectedcoin = localStorage.getItem("selectedmainCoin")
      this.setSelectedCoin();
      this.$emit("chooseCurrency", this.selectedcurrency)
      
    },
  },
  mounted() {
    this.setData();
    this.getMarketDropdown();
   this.setMainCoin();
   this.matchPriceMATCH = localStorage.getItem("matchPriceMATCH");
  
  },
  computed: {
    filterCoins: function(){
      return this.coindata.filter((marketPrice) => {
        return marketPrice.pair_name.toLowerCase().includes(this.searchcoin.toLowerCase())
      })
    }
  },
  created: function () {
    this.setMainCoin();
   // this.setCoin();
    const ts = this;
    this.connection = new WebSocket( "ws://34.152.9.147:8002/ws");

    this.connection.onmessage = function (event) {
     ts.dataAl = JSON.parse(event.data);
   if (ts.dataAl.type == "match") {
           
         // for (let a = 0; a < 1; a++) {
             ts.fill = ts.dataAl.price;
              ts.priceBuy=ts.dataAl.bids;
              
          //}
        }


      if(ts.dataAl.type == "ticker"){
       ts.tickerPrice=ts.dataAl.price
        ts.open24h=ts.dataAl.open24h
        ts.low24h=ts.dataAl.low24h
        ts.volume24h=ts.dataAl.volume24h
       
      }

      if(ts.open24h==0 ){
         ts.ldcx24h==0
      }else{
          ts.ldcx24h=((ts.tickerPrice - ts.open24h)/ts.open24h )* 100
      }
    
      ts.setData(ts.fill, ts.open24h,ts.low24h, ts.volume24h, ts.ldcx24h);
    
    };

    this.connection.onopen = function (event) {
      console.log(event);
      ts.sendMessage();
    };

    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Trade/Trade";

 .buy{
    color: #18e140 !important;
  }
  .sell{
    color:red !important;
  }
</style>