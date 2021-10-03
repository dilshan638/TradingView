<template>
    <div class="trade-box buysell-form">
        <div class="trade-header text-center">
            Buy / Sell
        </div>
        <div class="trade-body">
            <div class="tab-top">
                <div class="top-tab buy-btn" @click="togglebuy" v-bind:class="[buytab == true ? 'active' : '']">Buy</div>
                <div class="top-tab sell-btn" @click="togglesell" v-bind:class="[selltab == true ? 'active' : '']">Sell</div>
            </div>
            <div class="buy-sell-content">
                <div class="inner-type">
                    <div class="sub-type" @click="toLimit" v-bind:class="[limitTab == true ? 'active' : '']">LImit</div>
                    <div class="sub-type" @click="toMarket" v-bind:class="[marketTab == true ? 'active' : '']">Market</div>
                    <div class="sub-type" @click="toStop" v-bind:class="[stopTab == true ? 'active' : '']">Stop</div>
                    <div class="sub-type" @click="toStopLimit" v-bind:class="[stoplimitTab == true ? 'active' : '']">Limit</div>
                </div>
            </div>
            <div class="price-form">
                <div class="input-group mb-3" :class="{ 'new-error': v$.amount.$error }">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Amount</span>  
                        <!-- :value="SellAmount" v-model="state.amount"  -->
                    </div>
                    <input type="text" class="form-control" v-model="state.amount"  aria-label=""   />
                    <div class="input-group-append">
                        <span class="input-group-text">{{SelectedSymbol}}</span>
                    </div>
                    <span class="error-msg" v-if="v$.amount.$error">Amount is {{ v$.amount.$errors[0].$message }} </span>
                </div>
                <div class="input-group mb-3" :class="{ 'new-error': v$.price.$error }">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Price</span>
                    </div>
                    <input type="text" class="form-control" v-model="state.price"   aria-label="" />
                    <div class="input-group-append">
                        <span class="input-group-text">{{pairName}}</span>
                    </div>
                    <span class="error-msg" v-if="v$.price.$error">Price is {{ v$.price.$errors[0].$message }} </span>
                </div>                  
                <div class="row">
                    <div class="col-6">
                        <div class="bottom-v">
                            <b>Fee</b>
                            <b>{{parseFloat(trade_fee).toFixed(3) }}</b>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bottom-v">
                            <b>Total</b>
                            <b class="success-text">{{this.state.amount * this.state.price}}</b>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button class="btn btn-primary pass-btn buyaction" @selectcoin="selectedcurrency = 'new name'" 
                        v-if="buytab" @click="buybtcformaction">BUY {{SelectedSymbol}}</button>
                        <button class="btn btn-primary pass-btn sellaction" v-else @click="buybtcformaction">SELL {{SelectedSymbol}} </button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

export default {
    name:'orderbook',

    props:["sellPrice","SellAmount","SelectedSymbol","pairName", "fullPairName"],
    components: {
    },
    setup() {
        const state = reactive({
            amount: '',
            price: ''
        })

        const rules = computed(() => {
            return {
                amount: { 
                    required,
                    numeric
                },
                price: { 
                    required,
                    numeric
                },                
                
            }    
        }) 
        
        const v$ = useValidate(rules, state)
        return { state, v$ }
    },     
    data() {
        return{
            buytab: true,
            selltab: false,
            limitTab: true,
            marketTab: false,
            stopTab: false,
            stoplimitTab: false,

            userBalance: '',
            selectedcurrency: localStorage.getItem("selectedmainCoin"),
            coindata: [],
            trade_fee: '',

            total:this.state.price*this.state.amount,
            coin: [],
            sendData: [],
            client_oid: "4949049",
            productId: "69069069",
            funds: 12,
            side: "buy",
            type: "limit",
            timeInForce: "",
        }
    },
    methods:{
        async getPairDetails() {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
            )}`,
        };           
        axios.get("https://dapi.exus.live/api/mobile/v1/trade/marcket/trade/pair", {headers: headers})
            .then((res) => {
            this.coindata =  res.data;
            for (let i = 0; i < res.data[0].length; i++) {
                console.log(res.data[0][i])
                if(res.data[0][i]["pair_name"] == this.selectedcurrency) {
                     this.trade_fee =res.data[0][i].trade_fee
                    // alert(fullPairName)
                    //alert(this.trade_fee)
                }                
            }
        })
            .catch(function (error) {
            console.log(error);
            })
        },
        async buybtcformaction() {
            this.v$.amount.$touch()
            this.v$.price.$touch()
            if (!this.v$.amount.error && !this.v$.price.error) { // if ANY fail validation
                // alert(this.state.amount)
                // alert(this.state.price)
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
                };                
                var data = {
                    "client_oid":"1616663784828",
                    "productId":"BTC-USDT",
                    "size":parseFloat(this.state.amount),
                    "funds":0.001,
                    "price":parseFloat(this.state.price),
                    "side":this.side,
                    "type":this.type,
                    "timeInForce":"1616663784828"
                };   

                try{
                    let response = await this.axios.post("http://34.152.9.147:8001/api/orders", data, headers)
                    .then(res => {
                       // this.sendData = response.data
                        console.log(response);
                        console.log(res); 
                    })
                }catch(error){
                    console.log(error)
                }         
            } else {
                console.log('invalid form validation')
            }
        },
        async setCuurency() {
            this.selectcurrency = localStorage.getItem("selectedmainCurrency")
            this.setCuurency();
        },
        async togglebuy() {
            this.buytab = true;
            this.selltab = false;
            if(this.buytab == true) {
                this.side = "buy";
            }
            else{
                this.side = "sell";
            }
        },
        async togglesell() {
            this.buytab = false;
            this.selltab = true;
            if(this.selltab == true) {
                this.side = "sell";
            }
            else{
                this.side = "buy";
            }
        },
        async toLimit() {
            this.limitTab = true;
            this.marketTab = false;
            this.stopTab = false;
            this.stoplimitTab = false;
            if(this.limitTab == true) {
                this.type = "limit";
            }          
        },
        async toMarket() {
            this.limitTab = false;
            this.marketTab = true;
            this.stopTab = false;
            this.stoplimitTab = false;
            if(this.marketTab == true) {
                this.type = "market";
            }          
        },
        async toStop() {
            this.limitTab = false;
            this.marketTab = false;
            this.stopTab = true;
            this.stoplimitTab = false;
            if(this.stopTab == true) { 
                this.type = "stop";
            }          
        },
        async toStopLimit() {
            this.limitTab = false;
            this.marketTab = false;
            this.stopTab = false;
            this.stoplimitTab = true;
            if(this.stoplimitTab == true) {
                this.type = "stoplimit";
            }          
        },
        getUserBalance() {
            this.coin = JSON.parse(localStorage.getItem("arraySymbol"));
            console.log(this.coin);
        },
        checkUserBalance() {
           // alert(localStorage.getItem("totalBalances"))
        }       
    },
created: function () {

  //  this.test2 = localStorage.getItem("selectedmainCoin");
  //  this.getPairDetails();
  },
  mounted() {
       this.getUserBalance();
       this.checkUserBalance();
       this.setCuurency();
        this.getPairDetails();
  }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>