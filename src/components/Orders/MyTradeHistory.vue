<template>
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="25%" scope="col">Date</th>
              <th width="10%" scope="col">Pair</th>
            
              <th scope="col">Side</th>
              <th scope="col">Price</th>
              <th scope="col">Executed</th>
              <th scope="col">Fee</th>
              <th scope="col">Total</th>
            
            </tr>
          </thead>
          <tbody v-if="dataAll.length != 0">
            <tr v-for="orders in dataAll" :key="orders.id">
              <td width="25%">{{ orders.createdAt }}</td>
              <td width="10%">{{ orders.productId }}</td>
             
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
     
    };
  },

  methods: {
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





  mounted() {
  
    this.geTradeHistory();
    window.setInterval(() => { this.getData()}, 3000)
   
   
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