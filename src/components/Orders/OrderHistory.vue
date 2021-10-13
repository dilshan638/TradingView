<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="set-flter-row">
          <div class="row">
            <div class="col-md-5">
              <b>Date</b>
              <div class="input-slot">
                <button class="f-btn" @click="oneDayFilter">1 Day</button>
                <button class="f-btn" @click="oneWeekFilter">1 Week</button>
                <button class="f-btn" @click="oneMonthFilter">1 Month</button>
                <button class="f-btn" @click="threeMonthFilter">3 Month</button>
                <input type="date" v-model="startDate" />
                <input type="date" v-model="endDate" />
                <button @click="dateRangeFilter">Search</button>
              </div>
            </div>

            <!-- <div class="col-md-3">
              <b>Pair</b>
              <div class="input-slot half break">
                <select
                  class="form-control sel-val"
                  id="one"
                  @change="PairOne($event)"
                >
                  <option value="">All</option>

                  <option value="BTC-">BTC</option>
                  <option value="ETH-">ETH</option>
                </select>
              </div>
              <div class="input-slot half">  
                <select
                  class="form-control sel-val"
                  id="two"
                  @change="PairTwo($event)"
                >
                  <option value="">All</option>
                  <option value="USDT">USDT</option>
                  <option value="BTC">BTC</option>
                </select>                              
              </div>
            </div>
            <div class="col-md-2">
                <b>Side</b>
                <div class="input-slot">
                  <select
                    class="form-control sel-val"
                    id="three"
                    @change="selectside($event)"
                  >
                    <option value="">All</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>                  
                </div>
            </div> -->
            <div class="col-md-2">
              <b></b>
              <button type="reset" class="reset-btn" @click="reset">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="set-flter-row">
          <!-- <div class="days-row">
          <button class="btn top-f-btn active">1 Day</button>
          <button class="btn top-f-btn" @click="setWeek">1 Week</button>
          <button class="btn top-f-btn">1 MOnth</button>
        </div> -->
        </div>
        <div class="calc-row"></div>
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

          <tr v-for="orders in orderHistory" :key="orders.id">
            <td width="22%">
              {{
                orders.createdAt.substring(0, orders.createdAt.lastIndexOf(" "))
              }}
            </td>
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
            <td>{{ orders.status }}</td>
            <td v-if="orders.status == 'open'">
              <button class="trade-btn">Cancel</button>
            </td>
            <td class="text-center" v-else>-</td>
          </tr>
          <tbody></tbody>
        </table>
      </div>
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
      lastDay: "",
      oneDay: "",
      oneWeek: "",
      oneMonth: "",
      threeMonth: "",

      todayDate: "",

      pOne: "",
      pTwo: "",
      selectedSide: "",
      oneeWeekArray: [],

      oneD: false,
      oneW: false,
      oneM: false,
      startDate: new Date(),
      endDate: new Date(),
     
      
    };
  },

  methods: {
    // async PairOne(pairone) {
    //   this.pOne = pairone.target.value;
    //   if(this.oneD==true){
    //     this.oneDayFilter()
    //   }
    //   if(this.oneW==true){
    //     this.oneWeekFilter()
    //   }
    //    if(this.oneM==true){
    //     this.oneMonthFilter()
    //   }
    //   else{
    //    console.log(`http://34.152.9.147:8001/api/orders?productId=${this.pOne}&status=open&before&after&startDate=&endtDate=&limit=1000&side=` )
    //   const headers = {};
    //     axios
    //     .get(
    //       `http://34.152.9.147:8001/api/orders?productId=${this.pOne}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`,
    //       {
    //         headers: headers,
    //       }
    //     )
    //     .then((res) => {
    //      console.log(res.data)
    //      this.orderHistory=res.data
    //   })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    // },

    // async PairTwo(pairtwo) {
    //   this.pTwo = pairtwo.target.value;

    //    if(this.oneD==true){
    //     this.oneDayFilter()

    //   }
    //   if(this.oneW==true){
    //     this.oneWeekFilter()

    //   }
    //    if(this.oneM==true){
    //     this.oneMonthFilter()
    //   }
    //     else{
    //    console.log(`http://34.152.9.147:8001/api/orders?productId=${this.pTwo}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`)
    //   const headers = {};
    //     axios
    //     .get(
    //       `http://34.152.9.147:8001/api/orders?productId=${this.pTwo}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`,
    //       {
    //         headers: headers,
    //       }
    //     )
    //     .then((res) => {
    //      console.log(res.data)
    //      this.orderHistory=res.data
    //   })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    // },
    // async selectside(side) {
    //   this.selectedSide = side.target.value;
    //    if(this.oneDay==true){
    //     this.oneDayFilter()
    //   }
    //   if(this.oneWeek==true){
    //     this.oneWeekFilter()
    //   }
    //    if(this.oneMonth==true){
    //     this.oneMonthFilter()
    //   }
    //     else{
    //    console.log(`http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=&endtDate=&limit=1000&side=${this.selectedSide}`)
    //   const headers = {};
    //     axios
    //     .get(
    //       `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=&endtDate=&limit=1000&side=${this.selectedSide}`,
    //       {
    //         headers: headers,
    //       }
    //     )
    //     .then((res) => {
    //      console.log(res.data)
    //      this.orderHistory=res.data
    //   })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    // },
    async reset() {
      // var dropDown = document.getElementById("one");
      // dropDown.selectedIndex = 0;

      //  var dropDownTwo = document.getElementById("two");
      // dropDownTwo.selectedIndex = 0;

      //  var dropDownThree = document.getElementById("three");
      // dropDownThree.selectedIndex = 0;

      // this.pOne = "";
      // this.pTwo = "";
      // this.selectedSide = "";
      this.todayDate = "";
      this.oneWeek = "";
      this.oneMonth = "";
      this.startDate = "";
      this.endDate = "";
      this.getData();
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
          //console.log(responsive)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async oneDayFilter() {
      this.oneD = true;
      //lastDay
      var date = new Date();
      date.setDate(date.getDate() - 1);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.lastDay = date.toJSON().slice(0, 10).replace(/-/g, "-");

      // this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
     const headers = {};
      axios
        .get(
          `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.lastDay}&endtDate=&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async oneWeekFilter() {
      this.oneW = true;
      var date = new Date();
      date.setDate(date.getDate() - 7);
      this.oneWeek = date.toJSON().slice(0, 10).replace(/-/g, "-");
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.oneWeek}&endtDate=${this.todayDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async oneMonthFilter() {
      this.oneM = true;
      var date = new Date();
      date.setDate(date.getDate() - 30);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.oneMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.oneMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // async conditional(){
    //  if((this.oneD==false) && (this.oneW==false) &&(this.oneM==false)){
    //        window.setInterval(() => {
    //       this.getData();
    //     }, 3000);
    //     }
    // },
    async dateRangeFilter() {
      console.log(
        `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.endDate}&endtDate=${this.startDate}&limit=1000&side=`
      );
      const headers = {};
      axios
        .get(
          `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.endDate}&endtDate=${this.startDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async threeMonthFilter() {
      var date = new Date();
      date.setDate(date.getDate() - 90);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.threeMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://34.152.9.147:8001/api/orders?productId=&status=open&before&after&startDate=${this.threeMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getData();
    //this.conditional()
  },
  //   computed: {
  // filterCoins: function () {
  //       return this.orderHistory.filter((orders) => {
  //         return (orders.productId.includes(this.pOne + this.pTwo) && orders.side.includes(this.selectedSide) && orders.createdAt.includes(this.todayDate ))
  //       });
  //     },

  //   },
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