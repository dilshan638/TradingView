<template>
    <section class="block-two market-block">
      <div class="container">
          <div class="row">
            <div class="col-md-12">
              <p>Lorem ipsum dolor sit amet, consereerrs</p>
            </div>
          </div>        
          <div class="row">
            <div class="col-lg-2 col-6 col-md-4" v-for="data in coindata"  :key="data.pair_name">
              <div class="block-line">
                <span>{{data.pair_name}} <b>+{{data.change}} </b></span>
                <h6>{{data.volume}}</h6>
                <p>$ {{data.last_price}}</p>
              </div>
            </div>
                     
          </div>
          <div class="row">
            <div class="col-md-12">
              <p class="sm-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed</p>
            </div>
          </div>            
      </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
data(){
  return{
    coindata:[]
  }
},
 methods: {
       
        async coinDetails() {
        axios.get("https://dapi.exus.live/api/mobile/v1/common/marcket/trade/pair")
            .then((res) => {
            this.coindata =  res.data[0];
            console.log(this.coindata); 

            // for (let i = 0; i < this.coindata.length; i++) {
            //     this.coin = this.coindata[i].pair_name.toLowerCase();
            //     this.lastprice = this.coindata[i].price;
            //     this.priceChanege = this.coindata[i].change_24h;
            // }
        })
            .catch(function (error) {
            console.log(error);
            })
        },
    },
     mounted() {
        this.coinDetails();
    },
}  
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Home/Home";
</style>