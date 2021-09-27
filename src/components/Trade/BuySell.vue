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
                <div class="sub-type" @click="toLimit" v-bind:class="[limitTab == true ? 'active' : '']">LImit</div>
                <div class="sub-type" @click="toMarket" v-bind:class="[marketTab == true ? 'active' : '']">Market</div>
                <div class="sub-type" @click="toStop" v-bind:class="[stopTab == true ? 'active' : '']">Stop</div>
                <div class="sub-type" @click="toStopLimit" v-bind:class="[stoplimitTab == true ? 'active' : '']">Limit</div>
            </div>
            <div class="price-form">
                <div class="input-group mb-3" :class="{ 'new-error': v$.amount.$error }">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Amount</span>
                    </div>
                    <input type="text" class="form-control" v-model="state.amount" aria-label="" />
                    <div class="input-group-append">
                        <span class="input-group-text">BTC</span>
                    </div>
                    <span class="error-msg" v-if="v$.amount.$error">Amount is {{ v$.amount.$errors[0].$message }} </span>
                </div>
                <div class="input-group mb-3" :class="{ 'new-error': v$.price.$error }">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Price</span>
                    </div>
                    <input type="text" class="form-control" v-model="state.price" aria-label="" />
                    <div class="input-group-append">
                        <span class="input-group-text">USD</span>
                    </div>
                    <span class="error-msg" v-if="v$.price.$error">Price is {{ v$.price.$errors[0].$message }} </span>
                </div>                  
                <div class="row">
                    <div class="col-6">
                        <div class="bottom-v">
                            <b>Fee (0.1%) :</b>
                            <b>0.00</b>
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
                        <button class="btn btn-primary pass-btn" @click="buybtcformaction">BUY BTC</button>
                        <!-- <ul>
                            <li v-for="sell in coin" :key="sell">
                                {{ sell.symbol }}
                            </li>
                        </ul> -->
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
    components: {
    },
    setup() {
        const state = reactive({
            amount: 0,
            price: 0
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

            total:this.state.price*this.state.amount,

            coin: [],

            sendData: [],
            client_oid: "4949049",
            productId: "69069069",
            funds: 12,
            side: "buy",
            type: "limit",
            timeInForce: ""
        }
    },
    methods:{
        async buybtcformaction() {
            this.v$.amount.$touch()
            this.v$.price.$touch()
            if (!this.v$.amount.error && !this.v$.price.error) { // if ANY fail validation
                // alert(this.state.amount)
                // alert(this.state.price)
                // const headers = {
                //     Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
                //     "Content-Type": "application/json",
                // };                
                var data = {
                "client_oid":"1616663784828",
                "productId":"BTC-USDT",
                "size":parseFloat(this.state.amount),
                "funds":0.01,
                "price":parseFloat(this.state.price),
                "side":this.side,
                "type":this.type,
                "timeInForce":"1616663784828"
                };   

                try{
                    let response = await this.axios.post("http://8a5e-2402-4000-2380-f223-b1f4-2b94-3df9-310.ngrok.io/api/orders", data)
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
        // getUserBalance() {
        //     this.coin = JSON.parse(localStorage.getItem("arraySymbol"));
        //     console.log(this.coin);
        // }
    },
  created: function() {
  },
  mounted() {
    //   this.getUserBalance();
  }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
  .tab-top{
    float: left;
    width: 100%;
    padding: 15px;
  }
  .top-tab{
    float: left;
    margin-right: 15px;
    margin-bottom: 15px;
    width: 44%;
    background-color: #393939;
    padding: 7px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .top-tab.active.buy-btn{
      background-color: #60db78;
      color: #fff !important;
  }
    .top-tab.active.sell-btn{
      background-color: #f14848;
      color: #fff !important;
  }
  .buy-sell-content{
    float: left;
    width: 100%;
    padding: 15px;
  }
  .sub-type{
    float: left;
    margin-right: 10px;
    margin-bottom: 15px;
    font-family: Rubik;
    font-size: 0.625rem;
    margin-bottom: 0 !important;
  }
  .sub-type.active{
      color: yellow;
  }
  .price-form{
    float: left;
    width: 100%;
    padding: 15px;
  }
  .pass-btn{
    float: left;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: none;
    margin-top: 30px;
  }
</style>