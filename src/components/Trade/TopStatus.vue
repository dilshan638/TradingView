<template>
  <div class="trade-box top-box" style="min-height: auto;">
    <!-- trade comoponents -->
    <div class="row status1">
      <div class="col-md-3 pos-rel">
        <div class="search-head" @click="dropdownshow = !dropdownshow" @blur="dropdownshow = false">
            <!-- <img :src="selectedcoinimage" />  -->
            <h4>{{defaultCoin}}</h4>
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
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image, marketprice.currency)">{{ marketprice.last_price }}</td>
                        <td @click="selectcoin(marketprice.pair_name, marketprice.image, marketprice.currency)" class="text-right success-text">{{marketprice.change}}%</td>
                    </tr>                                                                                                                                                                                           
                </tbody>
              </table>
          </div>
        </div>
      </div>
      
    </div> 
  </div>
</template>

<script>


import axios from 'axios';
export default {
   emits: ["symbol","pair_name", "full_pair_name"],
  name: "topstatus",
  data() {
    return {
      dropdownshow: false,
      searchcoin: '',
      defaultCoin: "",
      selectedcoin: "",
      selectedcoinimage: "",
      selectedcurrency: "BTC",
      dafaultcoinimage: "",
      coin: "",
      dataAl: [],
   };
  },

  methods: {
    setMainCoin() {
      if(localStorage.getItem("selectedmainCoin")!=null){
          this.defaultCoin = localStorage.getItem("selectedmainCoin");
          this.selectedcoinimage = localStorage.getItem("selectedcoinimage");
          this.$emit("symbol", this.defaultCoin.substring(0, this.defaultCoin.lastIndexOf('/')))
          this.$emit("pair_name", this.defaultCoin.substring(this.defaultCoin.lastIndexOf("/") + 1))
          this.$emit("full_pair_name", this.defaultCoin)
        
    }
      else{
          this.defaultCoin = "BTC/USDC";
          this.$emit("symbol", "BTC")
          this.$emit("pair_name", "USDC")
          this.$emit("full_pair_name", this.defaultCoin)
          localStorage.setItem("selectedmainCoin",this.defaultCoin)
      }
    },

    async getMarketDropdown() {          
       axios.get("https://dapi.exus.live/api/mobile/v1/common/marcket/trade/pair")
        .then((res) => {
        this.coindata =  res.data[0];
       for (let i = 0; i < this.coindata.length; i++) {
            this.coin = this.coindata[i].pair_name.toLowerCase();
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

    },
     async setCoin() {
     localStorage.setItem("selectedmainCurrency", this.selectedcurrency)
      this.selectedcoin = localStorage.getItem("selectedmainCoin")
      
    },
    
    

  },
  mounted() {
 
  this.getMarketDropdown();
  this.setMainCoin();
  },
  computed: {
    filterCoins: function(){
      return this.coindata.filter((marketPrice) => {
        return marketPrice.pair_name.toLowerCase().includes(this.searchcoin.toLowerCase())
      })
    }
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