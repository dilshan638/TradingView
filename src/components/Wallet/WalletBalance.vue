<template>
  <div class="card only-card-header">
    <div class="card-header">
      <div class="row">
        <div class="col-md-4">
          <h2>
            Wallet Balances
            <span class="eye-point"
              ><i class="ri-eye-line"></i> Hide Balances</span
            >
          </h2>
          <router-link to="/securitypage">
            <button
              type="button"
              class="btn btn-primary btn-sm btn-outline mt-4 active"
            >
              Deposit
            </button></router-link
          >
          <router-link to="/wallet/cryptoone">
            <button
              type="button"
              class="btn btn-primary btn-sm mt-4 btn-outline"
            >
              Withrow
            </button></router-link
          >
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-3">
              <div class="block">
                <p>Total Balance</p>
                <h4>{{ this.totalBalance }} <span>BTC</span></h4>
              </div>
            </div>

            <div class="col-md-1">
              <div class="block">
                <br />
                <h4>|</h4>
              </div>
            </div>

            <div class="col-md-8">
              <div class="block">
                <p>Market Value</p>
                <h4>${{ this.marketvalue }}</h4>
              </div>
            </div>
          </div>
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
      cryptoAll: [],
      usergetCrypto: [],
      marketPrice: 0,

      // total:0,
      totalBalance: 0,
      marketvalue: 0,
      total:[]
    };
  },

  methods: {
    getCryptoAll() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/wallet/all/crypto", {
          headers: headers,
        })
        .then((response) => {
          this.cryptoAll = response.data[0];

          axios
            .get("https://dapi.exus.live/api/mobile/v1/wallet/user/crypto", {
              headers: headers,
            })
            .then((response) => {
              this.usergetCrypto = response.data[0];

              for (let i = 0; i < this.cryptoAll.length; i++) {
                this.cryptoAll[i]["amount"] = this.usergetCrypto[i]["amount"];
                this.marketvalue =
                  this.marketvalue + JSON.parse(this.cryptoAll[i]["amount"]);
                  this.total.push({ symbol: this.cryptoAll[i]["symbol"], balance:  this.cryptoAll[i]["amount"]*this.marketPrice });
                  

                if (this.marketvalue == 0) {
                  this.totalBalance = 0;
                } else {
                  this.totalBalance =
                    this.totalBalance +
                    JSON.parse(
                      (this.cryptoAll[i]["amount"] * this.marketPrice) /
                        this.marketvalue
                    );
                }
              }

               localStorage.setItem("totalBalances", JSON.stringify(this.total));
            });
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    getUsergetCrypto() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };
      axios
        .get("https://dapi.exus.live/api/mobile/v1/wallet/user/crypto", {
          headers: headers,
        })
        .then((response) => {
          this.usergetCrypto = response.data[0];
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    async getMarketPrice() {
      var data = {
        pair: "BTC/USD",
        type: "buy",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1//trade/marcket",
        data,
        hed
      );
      this.marketPrice = response.data.price;

      console.log(response.data.price);
    },
  },

  mounted() {
    this.getMarketPrice();
    this.getCryptoAll();
  },
};
</script>

<style>
</style>