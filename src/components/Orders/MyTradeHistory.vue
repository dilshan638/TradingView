<template>
    <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="25%" scope="col">Date</th>
                        <th width="10%" scope="col">Pair</th>
                        <th scope="col">Type</th>
                        <th scope="col">Side</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Filled</th>
                        <th scope="col">Total</th>
                        <th scope="col">Trigger Conditions</th>
                    </tr>
                </thead>
                <tbody  v-if="myTradeHistory.length !=0">   
                    <tr  v-for="orders in myTradeHistory" :key="orders.id">
                    <td width="25%">{{orders.createdAt}}</td>
                     <td width="10%">{{orders.productId}}</td>
                    <td>{{orders.type}}</td>
                     <td v-bind:class="[orders.side == 'buy' ? 'buy' : 'sell']">{{orders.side}}</td>
                       <td>{{orders.price}}</td>
                     <td>{{orders.executedValue}}</td>
                         <td>{{orders.filledSize}}</td>
                     <td>{{orders.filledSize * orders.price }}</td>
                          <td>-</td>
                     
                
                  </tr>                         
                </tbody>

                  <tbody v-else>   
                    <tr >
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
    name: 'orderhistory',
    components: {
    },
    data(){
        return{
            tradeHistory:[],
            myTradeHistory:[]
        }
    },

    methods:{
         async geTradeHistory() {
      var data = {
        limit: "60",
        offset: 1,
        search: "",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
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
       const headers = {
 };

      axios
        .get("http://localhost:8001/api/orders?productId=BTC-USDT&status=open&status=filled&status=new&before&after&limit=100", {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive.data);
          this.myTradeHistory=responsive.data
         
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    },

    mounted() {
    this.geTradeHistory();
    this.getData()
   

  },
}
</script>

<style>
.buy {
  color: green !important;
}
.sell {
  color: red !important;
}
</style>