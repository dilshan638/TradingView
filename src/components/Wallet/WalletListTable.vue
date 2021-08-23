<template>
  <div class="card table-card">
    <div class="card-header">
      <div class="row">
        <div class="col-md-9">
          <h2>Crypto</h2>
        </div>
        <div class="col-md-3">
          <div class="search-form">
            <input type="text" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover wallet-table">
            <thead>
              <tr>
                <th scope="col">Coin</th>
                <th scope="col" class="text-right">Total</th>
                <th scope="col" class="text-right">BTC Values</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in cryptoAll" :key="crypto.id">
                <td>
                  <img :src="crypto.image" />
                  <h4>
                    {{ crypto.symbol }}
                    <span>{{ crypto.name }}</span>
                  </h4>
                </td>

                <td class="text-right">{{ marketPrice *  crypto.amount  }}</td>
                <td
                  class="text-right"
                >
                {{ crypto.amount }}
                </td>
                <td class="action-td">
                  <a>Deposit</a>
                  <a>Withdraw</a>
                  <a>Trade</a>
                </td>
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
  data() {
    return {
      cryptoAll: [],
      usergetCrypto: [],
      marketPrice: [],
      AllData: [],
    };
  },

  methods: {
    getCryptoAll() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
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

                    for(let i=0; i<this.cryptoAll.length;i++){
                        this.cryptoAll[i]['amount']=this.usergetCrypto[i].amount
                    }

              this.AllData =  [this.cryptoAll,  this.usergetCrypto];

              console.log(this.cryptoAll);
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
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
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
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
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
    this.getCryptoAll();
  
    this.getMarketPrice();
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/wallet/wallet";
</style>