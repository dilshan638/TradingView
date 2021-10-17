<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="set-flter-row">
          <div class="row">
            <div class="col-md-4" v-if="$route.path != '/orders'">
              <div class="input-slot">
                <button class="f-btn" @click="oneDayFilter" v-bind:class="[this.onedayaction == true ? 'active' : '']">1 Day</button>
                <button class="f-btn" @click="oneWeekFilter" v-bind:class="[this.oneweekaction == true ? 'active' : '']">1 Week</button>
                <button class="f-btn" @click="oneMonthFilter" v-bind:class="[this.onemonthaction == true ? 'active' : '']">1 Month</button>
                <button class="f-btn" @click="threeMonthFilter" v-bind:class="[this.threemonthaction == true ? 'active' : '']">3 Months</button>
              </div>
            </div>
            <div class="col-md-6" v-if="$route.path != '/orders'">
              <span>Time</span>
              <div class="time-plate">
                <Datepicker
                show-clear-button
                  range
                  v-model="selectedDate" lang="en" placeholder="YYYY-MM-DD"
                  input-class="date-range-picker"
                  position="top"
                />    
                <button @click="dateRangeFilter" class="sea-btn">Search</button>            
              </div>
            </div>
            <div class="col-md-3" v-if="$route.path != '/trade'">
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
            <div class="col-md-2" v-if="$route.path != '/trade'">
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
            </div>
            <div class="col-md-2" v-if="$route.path != '/orders'">
              <button type="reset" class="reset-btn" @click="reset">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
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
                orders.createdAt
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
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import VueDatepickerUi from 'vue-datepicker-ui';
export default {
  name: "orderhistory",
  components: {
    Datepicker: VueDatepickerUi
  },
  data() {
    return {
      orderHistory: [],
      lastDay: "",
      oneDay: "",
      oneWeek: "",
      oneMonth: "",
      threeMonth: "",

      selectedDate: [
        new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000),
        new Date()
      ],
      disabledStartDate: {
        to: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        from: new Date()
      },        

      onedayaction: false,
      oneweekaction: false,
      onemonthaction: false,
      threemonthaction: false,      

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

    async History(){
    
    },

    async PairOne(pairone) {
      this.pOne = pairone.target.value;
      if(this.oneD==true){
        this.oneDayFilter()
      }
      if(this.oneW==true){
        this.oneWeekFilter()
      }
       if(this.oneM==true){
        this.oneMonthFilter()
      }
      else{
       console.log(`http://104.154.96.67:8001/api/orders?productId=${this.pOne}&status=open&before&after&startDate=&endtDate=&limit=1000&side=` )
      const headers = {};
        axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=${this.pOne}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         console.log(res.data)
         this.orderHistory=res.data
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    },

    async PairTwo(pairtwo) {
      this.pTwo = pairtwo.target.value;

       if(this.oneD==true){
        this.oneDayFilter()

      }
      if(this.oneW==true){
        this.oneWeekFilter()

      }
       if(this.oneM==true){
        this.oneMonthFilter()
      }
        else{
       console.log(`http://104.154.96.67:8001/api/orders?productId=${this.pTwo}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`)
      const headers = {};
        axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=${this.pTwo}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         console.log(res.data)
         this.orderHistory=res.data
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    async selectside(side) {
      this.selectedSide = side.target.value;
       if(this.oneDay==true){
        this.oneDayFilter()
      }
      if(this.oneWeek==true){
        this.oneWeekFilter()
      }
       if(this.oneMonth==true){
        this.oneMonthFilter()
      }
        else{
       console.log(`http://104.154.96.67:8001/api/orders?productId=&status=open&before&after&startDate=&endtDate=&limit=1000&side=${this.selectedSide}`)
      const headers = {};
        axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&status=open&before&after&startDate=&endtDate=&limit=1000&side=${this.selectedSide}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         console.log(res.data)
         this.orderHistory=res.data
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    async reset() {
      // var dropDown = document.getElementById("one");
      // dropDown.selectedIndex = 0;

      //  var dropDownTwo = document.getElementById("two");
      // dropDownTwo.selectedIndex = 0;

      //  var dropDownThree = document.getElementById("three");
      // dropDownThree.selectedIndex = 0;

      this.pOne = "";
      this.pTwo = "";
      this.selectedSide = "";
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
          "http://104.154.96.67:8001/api/orders?productId=BTC-USDT&status=open&status=filled&status=new&before&after&limit=100",
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
      this.onedayaction = true;
      this.oneweekaction = false;
      this.onemonthaction  = false;
      this.threemonthaction = false;
      this.oneD = true;
      //lastDay
     var date = new Date();
      date.setDate(date.getDate() + 1);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.lastDay = date.toJSON().slice(0, 10).replace(/-/g, "-");
   
      // this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
     const headers = {};
     axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.todayDate}&endtDate=${this.lastDay}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.orderHistory = res.data;
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async oneWeekFilter() {
      this.onedayaction = false;
      this.oneweekaction = true;
      this.onemonthaction  = false;
      this.threemonthaction = false;

      this.oneW = true;
      var date = new Date();
      date.setDate(date.getDate() - 7);
      this.oneWeek = date.toJSON().slice(0, 10).replace(/-/g, "-");
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      console.log( `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.oneWeek}&endtDate=${this.todayDate}&limit=1000&side=`)
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.oneWeek}&endtDate=${this.todayDate}&limit=1000&side=`,
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
      this.onedayaction = false;
      this.oneweekaction = false;
      this.onemonthaction  = true;
      this.threemonthaction = false;

      this.oneM = true;
      var date = new Date();
      date.setDate(date.getDate() - 30);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.oneMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.oneMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
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
      const headers = {};
      console.log( `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.selectedDate[0].toISOString().slice(0, 10)}&endtDate=${this.selectedDate[1].toISOString().slice(0, 10)}&limit=1000&side=`)
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.selectedDate[0].toISOString().slice(0, 10)}&endtDate=${this.selectedDate[1].toISOString().slice(0, 10)}&limit=1000&side=`,
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
      this.onedayaction = false;
      this.oneweekaction = false;
      this.onemonthaction  = false;
      this.threemonthaction = true;      
      
      var date = new Date();
      date.setDate(date.getDate() - 90);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.threeMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.threeMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
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
    let ts= this
     this.eventBus.on('orderHistory',function(){
      ts.getData()
     })
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