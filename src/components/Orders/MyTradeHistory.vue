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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "orderhistory",
  props: ["myTradeHistory"],
  components: {},
  data() {
    return {
      tradeHistory: [],
      // myTradeHistory: [],
      dataAll: [],
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

  computed: {
    filterCoins: function () {
      
      return this.dataAll.filter((orders) => {
        return (
          orders.productId.includes(this.pOne + this.pTwo) &&
          orders.side.includes(this.selectedSide)
        );
      });
    },
  },

  mounted() {
    this.geTradeHistory();
   this.getData();
    window.setInterval(() => {
      this.getData()
    }, 3000)
   // date>= startDate && date<=endDate
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