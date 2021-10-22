<template>
  <div>
    <div class="row">
     <div class="col-md-12">
       <div class="set-flter-row">
          <div class="row">
            <div class="col-md-5">
              <span>Time</span>
              <div class="time-plate">
                <Datepicker @blur="getRangeDate" 
                 show-clear-button
                  range
                  v-model="selectedDate" lang="en" placeholder="YYYY-MM-DD"
                  input-class="date-range-picker"
                  position="top"
                />    
                <button @click="dateRangeFilter" class="sea-btn">Search</button>            
              </div>
            </div>
            <div class="col-md-2" v-if="$route.path != '/orders'">
              <button type="reset" class="reset-btn" @click="reset">Reset</button>
            </div>  
            <div class="col-md-3" v-bind:class="[$route.path != '/trade' ? 'active' : '']">
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
            </div>          
          </div>
       </div>
     </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
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
              <tr v-for="orders in dataAll" :key="orders.id">
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
  </div>
</template>

<script>
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import VueDatepickerUi from 'vue-datepicker-ui';
import axios from "axios";
export default {
  name: "orderhistory",
  props: ["myTradeHistory"],
  components: {
    Datepicker: VueDatepickerUi
  },
  data() {
    return {
      lastDay: "",
      oneDay: "",
      oneWeek: "",
      oneMonth: "",
      threeMonth: "",
      todayDate: "",

      onedayaction: false,
      oneweekaction: false,
      onemonthaction: false,
      threemonthaction: false,

      


      selectedDate: [
        new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000),
        new Date()
      ],
      disabledStartDate: {
        to: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        from: new Date()
      },      
      tradeHistory: [],
      // myTradeHistory: [],
      dataAll: [],
      pOne: "",
      pTwo: "",
      selectedSide: ""
    };
  },

  methods: {
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
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
        axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=${this.pOne}&status=open&before&after&startDate=&endtDate=&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         console.log(res.data)
         this.dataAll=res.data
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
         this.dataAll=res.data
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
      const headers = {};
        axios
        .get(
          `http://104.154.96.67:8081/api/orders?productId=&status=open&before&after&startDate=&endtDate=&limit=1000&side=${this.selectedSide}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         console.log(res.data)
         this.dataAll=res.data
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    async getRangeDate() {
     // var start_date = this.selectedDate[0];
     // var end_date = this.selectedDate[1];

    //  var format_start_date = start_date.toISOString().slice(0, 10);
   //   var format_end_date = end_date.toISOString().slice(0, 10);
      //alert(format_start_date)
     // alert(format_end_date)

    
    },
    
     async oneDayFilter() {
       this.onedayaction = true;
       this.oneweekaction = false;
       this.onemonthaction = false,
       this.threemonthaction = false
     var date = new Date();
      date.setDate(date.getDate() +1);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.lastDay = date.toJSON().slice(0, 10).replace(/-/g, "-");

     const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.todayDate}&endtDate=${this.lastDay}&limit=1000&side=&status=filled`,
          {
            headers: headers,
          }
        )
        .then((res) => {
         this.dataAll = res.data
         console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

   async oneWeekFilter() {
       this.onedayaction = false;
       this.oneweekaction = true;
       this.onemonthaction = false,
       this.threemonthaction = false     
     
      var date = new Date();
      date.setDate(date.getDate() - 7);
      this.oneWeek = date.toJSON().slice(0, 10).replace(/-/g, "-");
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&before&after&startDate=${this.oneWeek}&endtDate=${this.todayDate}&limit=1000&side=&status=filled`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.dataAll = res.data;
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async oneMonthFilter() {

       this.onedayaction = false;
       this.oneweekaction = false;
       this.onemonthaction = true,
       this.threemonthaction = false      
     
      var date = new Date();
      date.setDate(date.getDate() - 30);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.oneMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&status=filled&before&after&startDate=${this.oneMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.dataAll = res.data;
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     async threeMonthFilter() {
       this.onedayaction = false;
       this.oneweekaction = false;
       this.onemonthaction = false,
       this.threemonthaction = true       
      var date = new Date();
      date.setDate(date.getDate() - 90);
      this.todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
      this.threeMonth = date.toJSON().slice(0, 10).replace(/-/g, "-");
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&status=filled&before&after&startDate=${this.threeMonth}&endtDate=${this.todayDate}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.dataAll = res.data
        })
        .catch(function (error) {
          console.log(error);
        });
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
      this.selectedDate[0]=""
      this.selectedDate[1]=""
      


    },
     async dateRangeFilter() {
      const headers = {};
      axios
        .get(
          `http://104.154.96.67:8001/api/orders?productId=&status=filled&before&after&startDate=${this.selectedDate[0].toISOString().slice(0, 10)}&endtDate=${this.selectedDate[1].toISOString().slice(0, 10)}&limit=1000&side=`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.dataAll = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
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
    
    },

    async getData() {
      const headers = {};
      axios
        .get(
          "http://104.154.96.67:8001/api/orders?productId=BTC-USDT&status=filled&before&after&limit=100",
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
    this.getRangeDate();
    this.geTradeHistory();

    let ts= this
     this.eventBus.on('myTradeHistory',function(){
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