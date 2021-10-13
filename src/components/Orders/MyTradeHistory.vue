<template>
  <div>
    <div class="row">
     <div class="col-md-12">
       <div class="set-flter-row">
          <div class="row">
            <div class="col-md-4">
                <button class="active">1 Day</button>
                <button>1 Week</button>
                <button>1 Month</button>
            </div>
            <div class="col-md-6">
              <span>Time</span>
              <div class="time-plate">
                <Datepicker @blur="getRangeDate"
                  range
                  v-model="selectedDate" lang="en" placeholder="Change Date range"
                  input-class="date-range-picker"
                  position="right"
                  showPickerInital = 'true'
                  disabled-start-date="disabledStartDate"
                />                
              </div>
            </div>
            <div class="col-md-2">
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
      selectedDate: [
        new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        new Date()
      ],
      disabledStartDate: {
        to: new Date('01.10.2021'),
        from: new Date('10.10.2021')
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
    },
    async getRangeDate() {
      var start_date = this.selectedDate[0];
      var end_date = this.selectedDate[1];

      var format_start_date = start_date.toISOString().slice(0, 10);
      var format_end_date = end_date.toISOString().slice(0, 10);
      alert(format_start_date)
      alert(format_end_date)

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
    this.getRangeDate();
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