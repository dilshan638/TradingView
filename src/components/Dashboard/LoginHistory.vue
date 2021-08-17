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
                <th scope="col">Date & Time</th>
                <th scope="col">IP Address</th>
                <th scope="col">Browser</th>
                <th scope="col">Location</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01-07-2021 14.32.22</td>
                <td>192.168.0.3</td>
                <td>Chrome</td>
                <td>London, United Kingdom</td>
                <td><span class="success-text">LOGIN</span></td>
              </tr>
              <tr>
                <td>01-07-2021 14.32.22</td>
                <td>192.168.0.3</td>
                <td>Chrome</td>
                <td>London, United Kingdom</td>
                <td><span class="error-text">LOGOUT</span></td>
              </tr>
              <tr>
                <td>01-07-2021 14.32.22</td>
                <td>192.168.0.3</td>
                <td>Chrome</td>
                <td>London, United Kingdom</td>
                <td><span class="error-text">LOGOUT</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <a class="view-more">View More</a>
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
    getPosts() {
      axios({
        method: 'post',
        url: 'https://dapi.exus.live/api/mobile/v1/history/login',
        headers: {
          'Authorization':'Bearer eyJraWQiOiJGczZSZDR2TkpwZW9xT0czbXRTeEZ6NnlucWlNbEZiVDB0ZGZWeFZ0VVFNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMjVjYmM0NS1jNTNlLTQ4NDgtOTg2NC1lMzkwYmEyZTE3NjQiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0yX2E3OWM5ZjQ1LWNiOTgtNGIzMi04ZDc0LWY4OTE5ZWRkOWY3MiIsImV2ZW50X2lkIjoiNzFiZmIwMDctZWEwZi00YzM0LTlhMzQtOTAwZjYyMTVlZTYxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTYyOTE4NDcwMCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfZmdXb0traDhqIiwiZXhwIjoxNjI5MjcxMTAwLCJpYXQiOjE2MjkxODQ3MDAsImp0aSI6ImFlNDFiNzg3LTRjOTctNGM2MC1hODBiLTJlOGZlMTc1NDllYSIsImNsaWVudF9pZCI6InE5bmFzbnUxMmtkNGpqMHRkYzliOGFwajEiLCJ1c2VybmFtZSI6ImRpbHNoYW5zYW5kYXJ1d2FuNjM4QGdtYWlsLmNvbSJ9.qa7tKgU25CxAmFleJe_Gw46PI-0AfaFp_PQghw5aFIKJ7PR5x_CqsBBZYVn89dhqE4TPUZaQ_-Tkq6y83fCfeaUKsEdM_H_hR-gupsDgED3oeLsV4S6EaPgxcqUGmR1qeoMkFgAJ6n8xhyTCaY-f5H4qHx0BnlLFf09x6kD1OE7XkGhUveJYDYuDVHdeVHVmPibFeg75GxLrWQrpvqxDSOfovk4hUmdYbuk4Xx1c1NFQgs_wuuNHr4GqjygDe6qaJ2s37PjiYbnnPCrvsrb5o6toWIcabTqMpWR21d74YuzFGLcd2CdeoO00FjYkSFfAIcADsZglHdBATkzLnYvOEw',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getPosts();
  },
};
</script>

<style>
</style>