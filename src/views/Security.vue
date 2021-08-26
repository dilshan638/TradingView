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
              <div class="col-md-4">
                <select-coin @AddList="getPassingAddress" />
              </div>
              <div class="col-md-8">
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
                      <b>Address</b>
                      <p>{{ addressList }}</p>
                    </li>

                    <li class="col-md-6">
                      <b>MInimum Deposit</b>
                      <p>0.00000001 BTC</p>
                    </li>
                    <li class="col-md-6">
                      <b>Average Arrival Time</b>
                      <p>0.00000001 BTC</p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected arrival</b>
                      <p>1 network confirmations</p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected Unlock</b>
                      <p>1 network confirmations</p>
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
    };
  },

  methods: {
    getAddress() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/wallet/user/crypto", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          this.address = response.data[0];
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // async createdAddressManual(){

    //  this.generatedAddress=localStorage.getItem("createdAddress");
    //   this.selectedListCoin= localStorage.getItem("createdAddressSelectList");

    //  },

    async getPassingAddress(ad) {
      console.log(ad);
      this.addressList = ad;
    },
  },

  mounted() {
    this.getAddress();
    // this.createdAddressManual()
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