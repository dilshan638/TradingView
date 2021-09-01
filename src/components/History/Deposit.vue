<template>
 
    <div class="card table-card">
      <div class="card-header">
        <h2>Login History</h2>
      </div>
      <div class="card-body no-padding no-padding-all">
        <div class="row">
          <div class="col-md-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Date & Time</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Deposit Amount</th>
                  <th scope="col">Description</th>
                    <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lghistory in loginHistory"
                  :key="lghistory.created_at"
                >
                  <td>{{ lghistory.No }}</td>
                  <td>{{ lghistory.created_at }}</td>
                  <td>{{ lghistory.currency }}</td>
                  <td>{{ lghistory.reference_no }}</td>
                  <td>{{ lghistory.amount }}</td>
                  <td>{{ lghistory.transaction_description }}</td>
                  <td>
                    <span class="success-text">{{ lghistory.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-md-11">
            <a class="view-more">View More</a>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

import axios from "axios";
export default {
  name: "Deposit",
  components: {
  
  },
  data() {
    return {
      loginHistory: [],
      count:0
    };
  },

  methods: {
    getCount() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/history/deposit/count", {
          headers: headers,
        })
        .then((response) => {
         
          this.count=response.data.count
          this.getHistory()
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async getHistory() {
      var data = {
        limit: this.count,
        offset: 1,
        search: "",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/history/deposit",
        data,
        hed
      );
      this.loginHistory = response.data;
      for (let i = 0; i < this.loginHistory.length; i++) {
        this.loginHistory[i]["No"] = i + 1;
      }
      console.log(this.loginHistory);
    },
  },

  mounted() {
    this.getCount();
    
  },
};
</script>

<style>
</style>