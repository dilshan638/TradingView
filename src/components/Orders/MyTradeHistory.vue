<template>
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
         <select class="form-control sel-val" @change="PairOne($event)" >
          <option value="BTC-USDT">BTC-USDT</option>
          <option value="ETH-test">ETH-Test</option>
         
        </select>
         <select class="form-control sel-val" @change="PairTwo($event)" >
          <option value="USDC">USDC</option>
          <option value="BTC">BTC</option>
         
        </select>
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="22%" scope="col">Date</th>
              <th width="13%" scope="col">Pair</th>
            
              <th scope="col">Side</th>
              <th scope="col">Price</th>
              <th scope="col">Executed</th>
              <th scope="col">Fee</th>
              <th scope="col">Total</th>
            
            </tr>
          </thead>
          <tbody v-if="dataAll.length != 0">
            <tr v-for="orders in filterCoins" :key="orders.id">
              <td width="22%">{{ orders.createdAt }}</td>
              <td width="13%">{{ orders.productId }}</td>
             
              <td v-bind:class="[orders.side == 'buy' ? 'buy' : 'sell']">
                {{ orders.side }}
              </td>
              <td>{{ orders.price }}</td>
              <td>{{ orders.executedValue }}</td>
              <td>{{ orders.fillFees }}</td>
              <td>{{ orders.size * orders.price }}</td>
             
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="9" align="center">No Data Available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "orderhistory",
  props:["myTradeHistory"],
  components: {},
  data() {
    return {
      tradeHistory: [],
     // myTradeHistory: [],
      dataAll: [],
      pOne:"",
      pairTwo:""

     
    };
  },

  methods: {

    async PairOne(pairone){
     this.pOne=pairone.target.value
    
    
    },

    async PairTwo(pairtwo){
       this.pairOne= pairtwo.target.value
    },
    async geTradeHistory() {
      var data = {
        limit: "60",
        offset: 1,
        search: "",
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
        "https://dapi.exus.live/api/mobile/v1/history/trade",

        data,
        hed
      );

      this.tradeHistory = response.data;
      console.log(this.tradeHistory);
    },

  

    async getData() {
     
      const headers = {};
      axios
        .get(
          "http://34.152.9.147:8001/api/orders?productId=BTC-USDT&status=filled&before&after&limit=100",
          {
            headers: headers,
          }
        )
        .then((responsive) => {
         
          this.dataAll = responsive.data;
             
        })
        .catch(function (error) {
          console.log(error);
          
        });
    },
  },
  //  watch: {
  //   PairOne: function (pairone) {
     
  //     this.pairOne = pairone.target.value
   
  //   },

    
  // },

  //  computed: {
  //     PairOne(pairone) {
  //     return alert(pairone);
  //   },
  // },

   computed: {
    filterCoins: function(){
      return this.dataAll.filter((orders) => {
        return orders.productId.includes(this.pOne)
      })
    }
  },





  mounted() {
  
    this.geTradeHistory();
    this.getData()
    // window.setInterval(() => { 
    //   this.getData()
    // }, 3000)
   
   
  },
};
</script>

<style>
.buy {
  color: #18e140 !important;
}
.sell {
  color: red !important;
}
</style>