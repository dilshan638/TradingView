<template>
  <default-layout>
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
                  <th scope="col">IP Address</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Location</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lghistory in loginHistory"
                  :key="lghistory.created_at"
                >
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
  </default-layout>
</template>

<script>
import DefaultLayout from "../../layout/DefaultLayout.vue";
import axios from "axios";
export default {
  name: "History",
  components: {
    DefaultLayout,
  },
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
        limit: "55",
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
        "https://dapi.exus.live/api/mobile/v1/history/login",
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
    this.getHistory();
  },
};
</script>

<style>
</style>