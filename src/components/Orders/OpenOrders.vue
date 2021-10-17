<template>

  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
       
         
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="22%" scope="col">Date</th>
              <th width="13%" scope="col">Pair</th>
              <th scope="col">Type</th>
              <th scope="col">Side</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Filled</th>
              <th scope="col">Total</th>
              <th scope="col">Trigger Conditions</th>
            </tr>
          </thead>

          <tr v-for="orders in openOrders" :key="orders.id">
            <td width="22%">{{ orders.createdAt }}</td>
            <td width="13%">{{ orders.productId }}</td>
            <td>{{ orders.type }}</td>
            <td v-bind:class="[orders.side == 'buy' ? 'buy' : 'sell']">
              {{ orders.side }}
            </td>
            <td>{{ orders.price }}</td>
            <td>{{ orders.size }}</td>
            <td>{{ orders.filledSize }}</td>
            <td>{{ orders.size * orders.price }}</td>
            <td>-</td>
          </tr>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import _ from 'lodash';
export default {
  name: "openorder",
  components: {},
  data() {
    return {
      openOrders: [],
     

    };
  },

  methods: {
    async getData() {
      const headers = {};

      axios
        .get(
          "http://104.154.96.67:8080/api/orders?productId=BTC-USDT&status=open&before&after&limit=100",
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
  },

  mounted() {
    //openOrders
    let ts= this
     this.eventBus.on('openOrders',function(){
      ts.getData()
     })
    this.getData();

   
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
