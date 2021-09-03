<template>
  <div class="card table-card">
    <div class="card-body no-padding no-padding-all">
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Date & Time</th>
                <th scope="col">IP Address</th>
                <th scope="col">Browser</th>
                <th scope="col">Location</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lghistory in loginHistory" :key="lghistory.created_at">
                <td>{{ lghistory.No }}</td>
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
  name: "History",
  components: {},
  data() {
    return {
      loginHistory: [],
      count: 0,
    };
  },

  methods: {
    async getCount() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
        "Content-Type": "application/json",
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/history/login/count", {
          headers: headers,
        })
        .then((response) => {
          this.count = response.data.count;
          this.getHistory();
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
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/history/login",
        data,
        hed
      );
      this.loginHistory = response.data;
      for (let i = 0; i < this.loginHistory.length; i++) {
        this.loginHistory[i]["No"] = i + 1;
      }
     
    },
  },

  mounted() {
    this.getCount();
  },
};
</script>

<style>
</style>