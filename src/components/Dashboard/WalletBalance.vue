<template>
  <div class="card wallet-balance-card">
    <div class="card-header">
      <div class="row">
        <div class="col-md-3">
          <h2>Wallet Balances</h2>
        </div>
        <div class="col-md-9 text-right">
          <router-link to="/securitypage">
          <button
              type="button"
              class="btn btn-primary btn-sm btn-outline active">
              Deposit
            </button>
            </router-link  >

           <router-link to="/withdraw-crypto">
          <button type="button" class="btn btn-primary btn-sm btn-outline">
            Withrow
          </button>
     </router-link  >
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="block">
            <p>Account Balance</p>
            <h4>{{ this.totalBalance }}<span>BTC</span></h4>
          </div>
          <div class="block">
            <p>Estimated Value</p>
            <h4>${{ this.marketvalue }}</h4>
          </div>
        </div>
        <div class="col-md-6" >
          <apexchart
            width="350"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      cryptoAll: [],
      usergetCrypto: [],
    //  cryptoBalance:[],
      marketPrice: 0,
      totalBalance: 0,
      marketvalue: 0,
      depositTab: true,
      withrowTab: false,
     // series: [44, 55, 41, 17],
      series:[],
      chartOptions: {
       // labels: ["LDXI", "BTC", "ETH", "HNT"],
       labels: [],
        chart: {
          type: "donut",
        },
        stroke: {
          show: false,
        },
        legend: {
          labels: {
            colors: "#878787",
            useSeriesColors: false,
          },
          markers: {
            width: 17,
            height: 17,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 3,
            customHTML: undefined,
            onClick: undefined,
            offsetX: -10,
            offsetY: 4,
          },
          itemMargin: {
            horizontal: 0,
            vertical: 8,
          },
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 290,
              },
              legend: {
              // position: "bottom",
                floating: false,
                //verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    showDeposit() {
      this.depositTab = true;
      this.withrowTab = false;
    },
    showWithrow() {
      this.withrowTab = true;
      this.depositTab = false;
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

    async getCryptoAll() {
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
                this.marketvalue =  this.marketvalue +JSON.parse(this.cryptoAll[i]["amount"]);

                this.series.push(this.cryptoAll[i]["amount"]*this.marketPrice)
                this.chartOptions.labels.push(this.cryptoAll[i]["symbol"])
            

                if (this.marketvalue == 0) {
                  this.totalBalance = 0;
                } else {
                    this.totalBalance =  this.totalBalance +JSON.parse((this.cryptoAll[i]["amount"] * this.marketPrice) /this.marketvalue);
                }
              }
            });
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
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