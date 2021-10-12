<template>
<div>
    <div class="row">
     <div class="col-md-12">
       <div class="set-flter-row">
          <div class="row">
            <div class="col-md-5">
              <b>Date</b>
              <div class="input-slot half">
                <input type="date" class="form-control" />
              </div>
              <div class="input-slot half">
                <input type="date" class="form-control" />
              </div>              
            </div>
            <div class="col-md-3">
              <b>Pair</b>
              <div class="input-slot half">
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
            <div class="col-md-2">
              <b></b>
              <button type="reset" class="reset-btn" @click="reset">Reset</button>
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

        <tr v-for="orders in filterCoins" :key="orders.id">
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
export default {
  name: "orderhistory",
  components: {},
  data() {
    return {
      orderHistory: [],
      oneDay: "",
      oneWeek: "",
      oneMonth: "",

      todayDate: "",

        pOne: "",
      pTwo: "",
      selectedSide: "",
    };
  },

  methods: {
    async PairOne(pairone) {
      this.pOne = pairone.target.value;
    },

    async PairTwo(pairtwo) {
      this.pTwo = pairtwo.target.value;
    },
    async selectside(side) {
      this.selectedSide = side.target.value;
    },
    async reset() {
      var dropDown = document.getElementById("one");
      dropDown.selectedIndex = 0;

       var dropDownTwo = document.getElementById("two");
      dropDownTwo.selectedIndex = 0;

       var dropDownThree = document.getElementById("three");
      dropDownThree.selectedIndex = 0;

      this.pOne = "";
      this.pTwo = "";
      this.selectedSide = "";
    },
    async setWeek() {
       var date = new Date();
      this.oneWeek = date.setDate(date.getDate() - 7);
      this.todayDate = date.setDate(date.getDate());
      alert(this.oneWeek)
      alert(this.todayDate)
      // if('2021-10-04'>= this.oneWeek && '2021-10-04'<=this.todayDate) {
      //    alert("yes")
      // }
      // else{
      //   alert("no");
      // }
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
      })
        .catch(function (error) {
          console.log(error);
        });
    },

    // async cancelation(){
    //    var data = {
          
    //       status: "withdraw",
    //       stage: 3,
    //     };
    //     let hed = {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem(
    //           "X-LDX-Inspira-Access-Token"
    //         )}`,
    //         "Content-Type": "application/json",
    //       },
    //     };
    //     let response = await this.axios
    //       .post("https://dapi.exus.live/api/twofa/sms/status", data, hed)
    //       .then((res) => {
    //         console.log(res);
    //         console.log(response);
            
    //       })
    //       .catch(function (error) {
    //         console.log(error);
            
    //       });
    // },
   
  },

  mounted() {
    this.getData();
    window.setInterval(() => {
      this.getData();
    }, 3000);
  },
  computed: {
filterCoins: function () {
      return this.orderHistory.filter((orders) => {
        return (orders.productId.includes(this.pOne + this.pTwo) && orders.side.includes(this.selectedSide));
      });
    },

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