<template>
      <div class="row">
        <div class="col-md-3" v-for="marketprice in coindata" :key="marketprice.coin">
            <div class="market-box">
              <div class="row">
                  <div class="col-md-7">
                    <img :src="marketprice.image"/>
                    <h5>{{ marketprice.pair_name }}</h5>
                  </div>
                  <div class="col-md-5"></div>
              </div>
              <div class="row">
                  <div class="col-md-9">
                      <h4>{{ parseFloat(marketprice.price).toFixed(2) }}</h4><span class="span-sub">{{ parseFloat(marketprice.price).toFixed(2) }}</span>
                  </div>
                  <div class="col-md-3">
                      <div class="change-status" v-bind:class="[change_24h < 0 ? 'minus' : 'plus']">{{ marketprice.change_24h }}</div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <h3>{{ marketprice.price }}</h3>
                      <b>Volume</b>
                  </div>
              </div>
            </div>
        </div>                     
    </div>
</template>

<script>

import axios from 'axios';
export default {
  props: {
  },

    data() {
        return{
            coindata: []
        }
    },

    methods: {
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
                this.coin = this.coindata[i].pair_name.toLowerCase();
                this.lastprice = this.coindata[i].price;
                this.priceChanege = this.coindata[i].change_24h;
            }
        })
            .catch(function (error) {
            console.log(error);
            })
        },       
    },
    mounted() {
        this.getMarketDropdown();
    }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Market/Market";
</style>