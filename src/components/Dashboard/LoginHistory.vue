<template>
  <div class="card table-card">
    <div class="card-header">
      <h2>Login History</h2>
    </div>
    <div class="card-body no-padding no-padding-all">
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Date & Time</th>
                  <th scope="col">IP Address</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Location</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lghistory in loginHistory" :key="lghistory.created_at">
                  <td>{{ lghistory.created_at }}</td>
                  <td>{{ lghistory.ip_address }}</td>
                  <td>{{ lghistory.browser_name }}</td>
                  <td>{{ lghistory.city }},{{ lghistory.country }}</td>
                  <td>
                    <span class="success-text">{{ lghistory.activity }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
         
           <router-link to="/history" class="view-more">
                   View More
              </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginHistory: [],
    };
  },
  methods: {
    getCount() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/history/login/count", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async getHistory() {
      var data = {
        limit: "4",
        offset: 1,
        search: "",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post("https://dapi.exus.live/api/mobile/v1/history/login", data, hed);
     this.loginHistory = response.data;
      console.log(response.data);
    },
  },

  mounted() {
    this.getCount();
    this.getHistory();
  },
};
</script>

<style>
</style>