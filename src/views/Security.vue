<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4>Deposit Crypto</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-xl-4">
                <select-coin @AddList="getPassingAddress" />
              </div>
              <div class="col-xl-8">
                <div class="barcode-area">
                  <div class="barcode-img">
                    <qrcode-vue
                      :value="value"
                      :size="size"
                      level="H"
                      class="qr"
                    />
                  </div>
                  <p>
                    Scan the code on the withdrawal page of<br />
                    the trading platform APP or wallet APP
                  </p>
                </div>
                <div class="barcode-detail">
                  <ul class="row">
                    <li class="col-md-12">
                      <b>Address <i class="ri-file-copy-line"></i></b>
                      <p>{{ addressList }}</p>
                    </li>

                    <li class="col-md-6">
                      <b>Minimum Deposit</b>
                      <p v-if="minimum_deposite!==null">--</p>
                      <p v-else>{{minimum_deposite}} BTC</p>
                    </li>
                    
                    <li class="col-md-6">
                      <b>Average Arrival Time</b>
                       <p v-if="avarege_arrival_time!==null">--</p>
                      <p v-else>{{avarege_arrival_time}}  BTC</p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected arrival</b>
                       <p v-if="expected_arrival!==null">--</p>
                      <p v-else>{{expected_arrival}}</p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected Unlock</b>
                       <p v-if="expected_unlock!==null">--</p>
                      <p v-else>{{expected_unlock}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout.vue";
import SelectCoin from "../components/SecurityPage/SelectCoin.vue";
import axios from "axios";
import QrcodeVue from "qrcode.vue";
export default {
  name: "security",
  components: {
    DefaultLayout,
    SelectCoin,
    QrcodeVue,
  },
  data() {
    return {
      address: [],
      createdAddress: "",
      generatedAddress: "",
      selectedListCoin: "",
      value: "otpauth://totp/SupremeCrypX?secret=ZZZQPGOCPUYLJDMP",
      size: 142,
      addressList: "",
       minimum_deposite: "",
      avarege_arrival_time: "",
      expected_arrival: "",
      expected_unlock: "",
    };
  },

  methods: {
  async  getAddress() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/wallet/user/crypto", {
          headers: headers,
        })
        .then((response) => {
         this.address = response.data[0];
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

  
    async getPassingAddress(ad) {
      console.log(ad);
      this.addressList = ad;
    },

    async depositDetails(){
      this.minimum_deposite= localStorage.getItem("minimum_deposite");
       this.avarege_arrival_time= localStorage.getItem("avarege_arrival_time");
        this.expected_arrival= localStorage.getItem("expected_arrival");
         this.expected_unlock= localStorage.getItem("expected_unlock");

         console.log(this.minimum_deposite)

      
      

    }
  },

  mounted() {
    this.getAddress();
    this.depositDetails()
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/wallet/wallet";
h4 {
  color: #fff;
  /* font-family: Rubik; */
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}
</style>