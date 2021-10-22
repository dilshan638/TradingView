<template>
  <div class="trade-box buysell-form buy-sell-box">
    <div class="trade-header text-center">Buy / Sell</div>

    <transition name="fade" v-on:enter="enter">
      <div v-if="showtrademesg" class="elementToFadeInAndOut">
        Trade successfully Updated!
      </div>
    </transition>
    <div class="trade-body">
      <div class="tab-top">
        <div
          class="top-tab buy-btn"
          @click="togglebuy"
          v-bind:class="[buytab == true ? 'active' : '']"
        >
          Buy
        </div>
        <div
          class="top-tab sell-btn"
          @click="togglesell"
          v-bind:class="[selltab == true ? 'active' : '']"
        >
          Sell
        </div>
      </div>
      <div class="balance">Balance: {{ balanceBuySell }} {{ pairName }}</div>
      <div class="buy-sell-content">
        <div class="inner-type">
          <div
            class="sub-type"
            @click="toLimit"
            v-bind:class="[limitTab == true ? 'active' : '']"
          >
            LImit
          </div>
          <div
            class="sub-type"
            @click="toMarket"
            v-bind:class="[marketTab == true ? 'active' : '']"
          >
            Market
          </div>
          <div
            class="sub-type"
            @click="toStopLimit"
            v-bind:class="[stoplimitTab == true ? 'active' : '']"
          >
            Stop Limit
          </div>
        </div>
      </div>
      <div class="price-form">
        <div
          class="input-group mb-3"
          :class="{ 'new-error': v$.amount.$error }"
        >
          <div class="input-group-prepend">
            <span class="input-group-text">Amount</span>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="state.amount"
            aria-label=""
          />
          <div class="input-group-append">
            <span class="input-group-text">{{ SelectedSymbol }}</span>
          </div>
          <span class="error-msg" v-if="v$.amount.$error"
            >Amount is {{ v$.amount.$errors[0].$message }}
          </span>
        </div>
        <div
          v-if="stoplimitTab == false"
          class="input-group mb-3"
          :class="{ 'new-error': v$.price.$error }"
        >
          <div class="input-group-prepend">
            <span class="input-group-text">Price</span>
          </div>

          <input
            type="text"
            class="form-control"
            v-model="state.price"
            aria-label=""
          />

          <div class="input-group-append">
            <span class="input-group-text">{{ pairName }}</span>
          </div>
          <span class="error-msg" v-if="v$.price.$error"
            >Price is {{ v$.price.$errors[0].$message }}
          </span>
        </div>
        <div class="input-group mb-3" v-if="stoplimitTab">
          <div class="input-group-prepend">
            <span class="input-group-text">Stop</span>
          </div>
          <input type="text" class="form-control" aria-label="" />

          <div class="input-group-append">
            <span class="input-group-text">{{ pairName }}</span>
          </div>
        </div>
        <div class="input-group mb-3" v-if="stoplimitTab">
          <div class="input-group-prepend">
            <span class="input-group-text">LImit</span>
          </div>
          <input type="text" class="form-control" aria-label="" />
          <div class="input-group-append">
            <span class="input-group-text">{{ pairName }}</span>
          </div>
        </div>
        <div class="present">{{ preseent }}%</div>
        <vue3-slider
          color="#52FF33"
          v-model="example1.value"
          v-bind="example1"
          tooltip="true"
          track-color="#4e4e4e" @change="findrange" @drag-start="testf" @drag-end="tests"
        />
        <div class="dot-area">
          <div class="dot"></div>
          <div class="dot one" v-bind:class="[this.example1.value >= 25 ? 'active' : '']" @click="set25"></div>
          <div class="dot two" v-bind:class="[this.example1.value >= 50 ? 'active' : '']" @click="set50"></div>
          <div class="dot three" v-bind:class="[this.example1.value >= 75 ? 'active' : '']" @click="set75"></div>
          <div class="dot four" v-bind:class="[this.example1.value >= 100 ? 'active' : '']" @click="set100"></div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="bottom-v">
              <b>Fee</b>
              <b>{{ parseFloat(trade_fee).toFixed(3) }}</b>
            </div>
          </div>
          <div class="col-6">
            <div class="bottom-v">
              <b>Total</b>
              <b class="success-text">{{
                this.state.amount * this.state.price
              }}</b>
            </div>
          </div>
        </div>
        <div class="row" v-if="authUser">
          <div class="col-md-12">
            <button
              class="btn btn-primary pass-btn buyaction"
              @selectcoin="selectedcurrency = 'new name'"
              v-if="buytab"
              @click="buybtcformaction"
            >
              BUY {{ SelectedSymbol }}
            </button>
            <button
              class="btn btn-primary pass-btn sellaction"
              v-else
              @click="buybtcformaction"
            >
              SELL {{ SelectedSymbol }}
            </button>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-12">
            <div class="login-action">
              <router-link to="/signin">Login</router-link> to trade
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import slider from "vue3-slider";
//import Slider from '@vueform/slider'
// eslint-disable-next-line no-unused-vars
import axios from "axios";
//import eventBus from "./../../event.js";
import "@vueform/slider/themes/default.css";

export default {
  name: "orderbook",

  props: [
    "sellPrice",
    "SellAmount",
    "SelectedSymbol",
    "pairName",
    "fullPairName",
  ],

  components: {
    "vue3-slider": slider,
    //  Slider
  },
  setup() {
    const state = reactive({
      amount: "",
      price: "",
    });

    const rules = computed(() => {
      return {
        amount: {
          required,
          numeric,
        },
        price: {
          required,
          numeric,
        },
      };
    });

    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  data() {
    return {  
      preseent: 0, 
      buytab: true,
      selltab: false,
      limitTab: true,
      marketTab: false,
      stopTab: false,
      stoplimitTab: false,
      authUser: false,
      showtrademesg: false,

      userBalance: "",
      selectedcurrency: localStorage.getItem("selectedmainCoin"),
      coindata: [],
      trade_fee: "",

      total: this.state.price * this.state.amount,
      coin: [],
      sendData: [],
      client_oid: "4949049",
      productId: "69069069",
      funds: 12,
      side: "buy",
      type: "limit",
      timeInForce: "",
      marketPrice:0,
      totalArray:[],
      cryptoAll:[],
      balanceBuySell:"",
      resOne:[],
      resTwo:[],

      val50: false,
      val75: false,
      val100: false,
      newAmount: null,
     example1: {
      value: parseFloat(this.balanceBuySell)
    },
      VUE_APP_SERVICE_URL: process.env.VUE_APP_SERVICE_URL
    };
  },
  methods: {
    async set25() {
      this.example1.value = 25
      this.val25 = true
      this.val50 = false
      this.val75 = false
      this.val100 = false      
    },  
    async set50() {
      this.example1.value = 50
      this.val25 = true
      this.val50 = true
      this.val75 = false
      this.val100 = false 
    },     
    async set75() {
      this.example1.value = 75
      this.val25 = true
      this.val50 = true
      this.val75 = true
      this.val100 = false 
    },
    async set100() {
      this.example1.value = 100
      this.val25 = true
      this.val50 = true
      this.val75 = true
      this.val100 = true 
    },    
    async getMarketPrice() {
      var data = {
        pair: "BTC/USD",
        type: "buy",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1//trade/marcket",
        data,
        hed
      );
      this.marketPrice = response.data.price;
    },
    async getCryptoAll() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
       axios
          .get(
            "https://dapi.exus.live/api/mobile/v1/wallet/user/crypto",
            {
              headers: headers,
            }
          )
          .then((response) => {
           this.cryptoAll = response.data[0];
           console.log(response.data)
          
           for (let i = 0; i < this.cryptoAll.length; i++) {
               this.totalArray.push({ symbol: this.cryptoAll[i]["symbol"], balance:  this.cryptoAll[i]["amount"]*this.marketPrice });
            }
             for (let j = 0; j < this.totalArray.length; j++) {
              if(this.totalArray[j]["symbol"]==this.selectedcurrency.substring(this.selectedcurrency.lastIndexOf("/") + 1)){
                     this.balanceBuySell =  this.totalArray[j]["balance"]

              }
            } 
            
           
         
          })
          .catch(function (error) {
            console.log(error);
          });
    
    },
    async getDataOpenOrders() {
      this.eventBus.emit('openOrders');
      const headers = {};

      axios
        .get(
          "http://104.154.96.67:8001/api/orders?productId=BTC-USDT&status=open&before&after&limit=100",
          {
            headers: headers,
          }
        )
        .then((responsive) => {
          
          this.openOrders = responsive.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getDataMyHistory() {
      this.eventBus.emit('myTradeHistory');
      const headers = {
        Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json", 
      };

      axios
        .get(
          "http://104.154.96.67:8001/api/orders?productId=BTC-USDT&status=open&status=filled&status=new&before&after&limit=100",
          {
            headers: headers,
          }
        )
        .then((responsive) => {
        this.resOne=responsive.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getDataOrderHistory() {
        this.eventBus.emit('orderHistory');
        const headers = {};

        axios
          .get(
            "http://104.154.96.67:8001/api/orders?productId=BTC-USDT&status=open&status=filled&status=new&before&after&limit=100",
            {
              headers: headers,
            }
          )
          .then((responsive) => {
           this.resTwo=responsive.data
            
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    async getPairDetails() {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
        };
        axios
          .get("https://dapi.exus.live/api/mobile/v1/trade/marcket/trade/pair", {
            headers: headers,
          })
          .then((res) => {
            this.coindata = res.data;
            
            for (let i = 0; i < res.data[0].length; i++) {
              if (res.data[0][i]["pair_name"] == 'BTC/USDC') {
                this.trade_fee = res.data[0][i].trade_fee;
            
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    async buybtcformaction() {
      this.getDataMyHistory();
      this.getDataOpenOrders();
      this.getDataOrderHistory();
      this.v$.amount.$touch();
      this.v$.price.$touch();
      if (!this.v$.amount.error && !this.v$.price.error) {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        };
        var data = {
          client_oid: "1616663784828",
          productId: "BTC-USDT",
          size: parseFloat(this.state.amount),
          funds: 0.001,
          price: parseFloat(this.state.price),
          side: this.side,
          type: this.type,
          timeInForce: "1616663784828",
        };
        try {
          let response = await this.axios
            .post("http://104.154.96.67:8001/api/orders", data, headers)
            .then((res) => {
              // this.sendData = response.data
              console.log(response);
              console.log(res);
              this.fadeMe();
              this.enter();
            });
        } 
        catch (error) {
          console.log(error);
        }
      } else {
        console.log("invalid form validation");
      }
    },
    async setCuurency() {
      this.selectcurrency = localStorage.getItem("selectedmainCurrency");
      // this.setCuurency();
      
    },
    async togglebuy() {
      this.buytab = true;
      this.selltab = false;
      if (this.buytab == true) {
        this.side = "buy";
      } else {
        this.side = "sell";
      }
    },
    async togglesell() {
      this.buytab = false;
      this.selltab = true;
      if (this.selltab == true) {
        this.side = "sell";
      } else {
        this.side = "buy";
      }
    },
    async toLimit() {
      this.limitTab = true;
      this.marketTab = false;
      this.stopTab = false;
      this.stoplimitTab = false;
      if (this.limitTab == true) {
        this.type = "limit";
      }
    },
    async toMarket() {
      this.limitTab = false;
      this.marketTab = true;
      this.stopTab = false;
      this.stoplimitTab = false;
      if (this.marketTab == true) {
        this.type = "market";
      }
    },
    async toStop() {
      this.limitTab = false;
      this.marketTab = false;
      this.stopTab = true;
      this.stoplimitTab = false;
      if (this.stopTab == true) {
        this.type = "stop";
      }
    },
    getUserBalance() {
      this.coin = JSON.parse(localStorage.getItem("arraySymbol"));
    },
    async checkAuthUser() {
        this.authUser = false;
        if(localStorage.getItem("X-LDX-Inspira-Access-Token")!=null){
          this.authUser = true;
        }
        else{
        this.authUser = false;
      }        
    },
    async toStopLimit() {
      this.limitTab = false;
      this.marketTab = false;
      this.stopTab = false;
      this.stoplimitTab = true;
      if (this.stoplimitTab == true) {
        this.type = "stoplimit";
      }
    },
    async findrange() {
      this.preseent = this.example1.value
      this.newAmount = this.balanceBuySell / 100 * this.preseent
      this.state.amount = this.newAmount
    },
    fadeMe: function() {
      this.showtrademesg = !this.showtrademesg;
    },
    enter: function() {
      var that = this;
      setTimeout(function() {
        that.showtrademesg = false;
      }, 3000);
    }
  },
  watch: {
    fullPairName: function(value) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/trade/marcket/trade/pair", {
          headers: headers,
        })
        .then((res) => {
          for (let i = 0; i < res.data[0].length; i++) {
            if (res.data[0][i]["pair_name"] == value) {
              this.trade_fee = res.data[0][i].trade_fee;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pairName: function(valueSelected) {
      for (let j = 0; j < this.totalArray.length; j++) {
        if(this.totalArray[j]["symbol"]==valueSelected){
          this.balanceBuySell =this.totalArray[j]["balance"]
        }
      } 
    
    },
  },
  mounted() {
    this.getMarketPrice();
    this.getCryptoAll();
    this.getUserBalance();
    this.setCuurency();
    this.getPairDetails();
    this.checkAuthUser();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Trade/Trade";
</style>
