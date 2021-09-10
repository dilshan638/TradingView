<template>
  <default-layout>
    <div class="card">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="mol-md-12">
              <p class="Withdraw-Crypto">Withdraw Crypto</p>
            </div>
          </div>
        </div>
        <div class="card-body textFields">
          <div class="row">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group pos-rel mb-4">
                    <p class="labels">Select Coin</p>
                    <select
                      placeholder="BTC-BITCOIN"
                      v-model="selectCoin"
                      class="form-control"
                      @change="onChange($event)"
                    >
                      <option disabled selected value>Select Coin</option>
                      <option
                        v-for="coins in coin"
                        :key="coins.symbol"
                        :value="coins.symbol"
                      >
                        {{ coins.symbol }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group pos-rel mb-4">
                    <p class="labels">Withdraw to</p>
                    <input
                      type="text"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row" v-if="shownetwork">
                <div class="col-md-12">
                  <div class="form-group pos-rel mb-4">
                    <p class="labels">Network</p>
                    <select placeholder="BTC-BITCOIN" class="form-control">
                      <option value="BTC-BITCOIN">BTC-BITCOIN</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group pos-rel mb-4">
                    <p class="labels">Withdraw Amount</p>
                    <input
                      type="text"
                      placeholder="Amount"
                      class="form-control"
                    />
                    <p class="bottom-grey">0.34423442 BTC available</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="BTC-spot-balance" >{{balanceSymbol}} spot balance</p>
                      <p class="BTC" >{{ balance }} {{balanceSymbol}}</p>
                    </div>
                    <div class="col-md-6">
                      <p class="BTC-spot-balance">Minimum withdrawal</p>
                      <p class="BTC">{{ min }} {{balanceSymbol}}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <p class="BTC-spot-balance">Network fee</p>
                      <p class="BTC pb-0">{{ free }} {{balanceSymbol}}</p>
                    </div>
                    <div class="col-md-6">
                      <p class="BTC-spot-balance">24h remaining limit</p>
                      <p class="BTC pb-0">{{ withdraw_limit_day }} {{balanceSymbol}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card amount-card">
                <div class="card-body crd">
                  <div class="Receive-Amount">
                    <p class="Receive-Amount-p">Receive Amount</p>
                    <div class="row">
                      <div class="col-md-9">
                        <p class="Values">0.37,434.74 <span>BTC</span></p>
                      </div>
                    </div>
                  </div>
                  <p class="BTC-network-fee-included">
                    0.0000005 BTC network fee included
                  </p>
                </div>
                <div>
                  <button
                    class="btn"
                    v-if="!shownetwork"
                    @click="actionwithorw"
                  >
                    Withdraw
                  </button>
                  <button
                    class="btn"
                    v-else
                    @click="actionwithorwsecuritymodal"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal ref="CryptoThreeModal" class="modal2-modal border50">
      <template v-slot:header>
        <h2 class="Security-Verification">Security Verification</h2>
      </template>
      <template v-slot:body>
        <security-verification />
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3" @click="withrowsuccessmodal">Submit</button>
          <button class="second-btn mb-3" @click="cyptothreeclose">
            Cancel
          </button>
        </div>
      </template>
    </modal>
    <modal ref="successwithdrowmodal" class="modal2-modal border50">
      <template v-slot:header>
        <img src="images/icons/correct.png" class="middle-img" />
      </template>
      <template v-slot:body>
        <withdrawal-submitted />
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3" @click="OpenWithdrowDetailModal">
            Complete
          </button>
          <button class="second-btn mb-3" @click="Closesuccesswithdrowmodal">
            Close
          </button>
        </div>
      </template>
    </modal>
    <modal ref="WithdrowDetailModal" class="modal2-modal border50">
      <template v-slot:header>
        <h2 class="Security-Verification">Withdrawal Details</h2>
      </template>
      <template v-slot:body>
        <!-- <withdrow-detail /> -->
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3" @click="withrowsuccessmodal">Submit</button>
          <button class="second-btn mb-3" @click="cyptothreeclose">
            Cancel
          </button>
        </div>
      </template>
    </modal>
  </default-layout>
</template>

<script>
import DefaultLayout from "../../layout/DefaultLayout.vue";
import SecurityVerification from "./SecurityVerification.vue";
import WithdrawalSubmitted from "./WithdrawalSubmitted.vue";
import Modal from "../Modal/Modal.vue";
// import WithdrowDetail from "./WithdrowDetail.vue";
import axios from "axios";
export default {
  name: "CryptoOne",
  components: {
    DefaultLayout,
    Modal,
    SecurityVerification,
    WithdrawalSubmitted,
    // WithdrowDetail,
  },
  data() {
    return {
      shownetwork: false,
      coin: [],
      selectCoin: "",
      selectedsingkeCoin: "",
      cryptoAll: [],
      fee: "",
      max: "",
      main: "",
      withdraw_limit_day: "",

      coinBalances:[],
      balance:"",
      balanceSymbol:"",
      symbolEvent:""
    };
  },
  methods: {
    actionwithorw() {
      this.shownetwork = true;
    },
    actionwithorwsecuritymodal() {
      this.$refs.CryptoThreeModal.openModal();
    },
    withrowsuccessmodal() {
      this.$refs.CryptoThreeModal.closeModal();
      this.$refs.successwithdrowmodal.openModal();
    },
    OpenWithdrowDetailModal() {
      this.$refs.successwithdrowmodal.closeModal();
      this.$refs.WithdrowDetailModal.openModal();
    },
    Closesuccesswithdrowmodal() {
      this.$refs.successwithdrowmodal.closeModal();
    },

    async getCoins() {
      this.coin = JSON.parse(localStorage.getItem("arraySymbol"));

      this.selectedsingkeCoin = JSON.parse(
        localStorage.getItem("selectedCoinWithdraw")
      );

      if (this.selectedsingkeCoin != null) {
        this.selectCoin = this.selectedsingkeCoin;
        console.log(this.selectCoin);
      }

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

          console.log(this.cryptoAll);

          for (let i = 0; i < this.cryptoAll.length; i++) {
            if (this.cryptoAll[i]["symbol"] == this.selectCoin) {
              this.free = this.cryptoAll[i].withrow_settings.fee;
              this.max = this.cryptoAll[i].withrow_settings.max;
              this.min = this.cryptoAll[i].withrow_settings.min;
              this.withdraw_limit_day =this.cryptoAll[i].withrow_settings.withdraw_limit_day;
            }
          }

          for (let t = 0; t < this.coinBalances.length; t++) {
          if(this.coinBalances[t]["symbol"]==this.selectCoin){
            this.balance=this.coinBalances[t]["balance"]
            this.balanceSymbol=this.coinBalances[t]["symbol"]
          }

        }
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    async onChange(event) {
     

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
          console.log(this.cryptoAll);

          console.log(this.selectCoin);

          for (let i = 0; i < this.cryptoAll.length; i++) {
            if (this.cryptoAll[i]["symbol"] == event.target.value) {
              this.free = this.cryptoAll[i].withrow_settings.fee;
              this.max = this.cryptoAll[i].withrow_settings.max;
              this.min = this.cryptoAll[i].withrow_settings.min;
              this.withdraw_limit_day =
              this.cryptoAll[i].withrow_settings.withdraw_limit_day;
            }
          }

        for (let t = 0; t < this.coinBalances.length; t++) {
          if(this.coinBalances[t]["symbol"]==event.target.value){
            this.balance=this.coinBalances[t]["balance"]
            this.balanceSymbol=this.coinBalances[t]["symbol"]
          }

        }

        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

   
  },

  mounted() {
    this.coinBalances=JSON.parse(localStorage.getItem("totalBalances"));
    this.getCoins();
   
  },
};
</script>

<style lang="scss" scoped>
@import "Crypto.scss";
</style>