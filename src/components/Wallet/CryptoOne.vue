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
                    <select placeholder="BTC-BITCOIN"  v-model="selectCoin" class="form-control">
                     <option disabled selected value>Select Coin</option>
                      <option v-for="coins in coin" :key="coins.symbol" :value="coins.symbol">
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
                    <input type="text" placeholder="Address" class="form-control" />
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
                    <input type="text" placeholder="Amount" class="form-control" />
                    <p class="bottom-grey">0.34423442 BTC available</p>
                  </div>
              </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-6">
                        <p class="BTC-spot-balance">BTC spot balance</p>
                        <p class="BTC">0.34423442 BTC</p>
                      </div>
                      <div class="col-md-6">
                        <p class="BTC-spot-balance">Minimum withdrawal</p>
                        <p class="BTC">0.0000010 BTC</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <p class="BTC-spot-balance">Network fee</p>
                        <p class="BTC pb-0">0.0000005 BTC</p>
                      </div>
                      <div class="col-md-6">
                        <p class="BTC-spot-balance">24h remaining limit</p>
                        <p class="BTC pb-0">0 BTC/0 BTC</p>
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
                      <button class="btn" v-if="!shownetwork" @click="actionwithorw">Withdraw</button>
                      <button class="btn" v-else @click="actionwithorwsecuritymodal">Withdraw</button>
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
          <button class="mb-3" @click="OpenWithdrowDetailModal">Complete</button>
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
        <withdrow-detail />
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
import WithdrowDetail from './WithdrowDetail.vue';
export default {
  name: "CryptoOne",
  components: {
    DefaultLayout,
    Modal,
    SecurityVerification,
    WithdrawalSubmitted,
    WithdrowDetail
  },
  data() {
    return{
      shownetwork: false,
      coin:[],
      selectCoin: "",
      selectedsingkeCoin:""
     
    }
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
    Closesuccesswithdrowmodal(){
      this.$refs.successwithdrowmodal.closeModal();
    },

      async getCoins() {
      this.coin =  JSON.parse(localStorage.getItem("arraySymbol"));

       this.selectedsingkeCoin = JSON.parse( localStorage.getItem("selectedCoinWithdraw"));

      if (this.selectedsingkeCoin != null) {
        this.selectCoin = this.selectedsingkeCoin;
      }
    },
  },

   mounted() {
    this.getCoins();
    
  },
};
</script>

<style lang="scss" scoped>
  @import "Crypto.scss";
</style>