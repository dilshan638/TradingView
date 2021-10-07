<template>
  <div class="row">
    <div class="col-md-12">
      <div class="set-flter-row">
          <div class="days-row">
            <button class="btn top-f-btn active" @click="setOneDay">1 Day</button>
            <button class="btn top-f-btn">1 Week</button>
            <button class="btn top-f-btn">1 MOnth</button>            
          </div>
      </div>
          <div class="calc-row">
         
          </div>
      </div>      
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th width="22%" scope="col">Date</th>
              <th width="13%" scope="col">Pair</th>
              <th scope="col">Type</th>
              <th scope="col">Side</th>
              <th scope="col">Price</th>
               <th scope="col">Executed</th>
              <th scope="col">Amount</th>
              <th scope="col">Filled</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
               <th scope="col">Action</th>
            </tr>
          </thead>

          <tr v-for="orders in neworderHistory" :key="orders.id">
            <td width="22%">{{ orders.createdAt.substring(0, orders.createdAt.lastIndexOf('T')) }}</td>
            <td width="13%">{{ orders.productId }}</td>
            <td>{{ orders.type }}</td>
            <td v-bind:class="[orders.side == 'buy' ? 'buy' : 'sell']">
              {{ orders.side }}
            </td>
            <td>{{ orders.price }}</td>
             <td>{{ orders.executedValue }}</td>
            <td>{{ orders.size }}</td>
            <td>{{ orders.filledSize }}</td>
            <td>{{ orders.size * orders.price }}</td>
            <td>{{orders.status}}</td>
            <td v-if="orders.status=='open'"> <button class="trade-btn">Cancel</button></td>
            <td class="text-center" v-else>-</td>
          </tr>
          <tbody></tbody>
        </table>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "orderhistory",
  components: {},
  data() {
    return {
      orderHistory: [],
      oneDay: "",
    };
  },

  methods: {
    async setOneDay() {
      this.oneDay= new Date().toJSON().slice(0,10).replace(/-/g,'-');
    },
    async getData() {
      const headers = {};

      axios
        .get(
          "http://34.152.9.147:8001/api/orders?productId=BTC-USDT&status=open&status=filled&status=new&before&after&limit=100",
          {
            headers: headers,
          }
        )
        .then((responsive) => {
          this.orderHistory = responsive.data;
          console.log(this.orderHistory)
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggleSort: function() {
      this.oldestFirst = !this.oldestFirst;
    },
  async  getCurrentdate() {
      var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      console.log(currentDateWithFormat);      
    }
  },

  mounted() {
    // window.setInterval(() => {
    //   this.getData();
    // }, 3000);
     this.getData();
     this.getCurrentdate();
  },
  computed: {
    neworderHistory: function() {
     // var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    //  console.log(currentDateWithFormat);
      return this.orderHistory.filter((orders) => {
      return (orders.createdAt.substring(0, orders.createdAt.lastIndexOf('T'))).includes( this.oneDay)
      })
    }
  },
};
</script>

<style>
.buy {
  color:#18e140 !important;
}
.sell {
  color: red !important;
}
</style>