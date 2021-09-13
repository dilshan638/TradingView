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
                  <div class="form-group pos-rel mb-4 multi-group">
                    <p class="labels">Select Coin</p>
                    <select
                      placeholder="BTC-BITCOIN"
                      v-model="state.selectCoin"
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
                      <span class="error-msg" v-if="v$.selectCoin.$error">{{ v$.selectCoin.$errors[0].$message }} </span>
                 
                  </div>
                    
                </div>
              
              </div>
                
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group pos-rel multi-group mb-4">
                    <p class="labels">Withdraw to</p>
                    <input
                      type="text"
                      placeholder="Address"
                      class="form-control"
                      v-model="state.withdrawAddress"
                    />
                     <span class="error-msg" v-if="v$.withdrawAddress.$error">{{ v$.withdrawAddress.$errors[0].$message }} </span>
                 
                  </div>
                </div>
              </div>
              <div class="row" v-if="shownetwork">
                <div class="col-md-12">
                  <div class="form-group pos-rel multi-group mb-4">
                    <p class="labels">Network</p>
                    <select placeholder="BTC-BITCOIN" class="form-control" v-model="state.network">
                      <option value="BTC-BITCOIN">BTC-BITCOIN</option>
                    </select>
                     <span class="error-msg" v-if="v$.network.$error">{{ v$.network.$errors[0].$message }} </span>
                 
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group pos-rel multi-group mb-4">
                    <p class="labels">Withdraw Amount</p>
                    <input
                      type="text"
                      placeholder="Amount"
                      class="form-control"
                      v-model="state.withdrawAmount"
                      @input="withdrawValidation"
                    />
                    <span class="error-msg" v-if="v$.withdrawAmount.$error">{{ v$.withdrawAmount.$errors[0].$message }} </span>
                 
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
        <security-verification
          :selectCoin="state.selectCoin"
          :withdrawAddress="state.withdrawAddress"
          :network="state.network" 
          :withdrawAmount="state.withdrawAmount"
          :free="free"
          :balanceSymbol="balanceSymbol"
           @ga="getGASuccess"
           @mb="getMBSuccess"
           @eml="getEmailSuccess"
          />
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
        
                    <button
      v-show="
        fa_mobile_status == 'true' &&
        (fa_email_status == null || fa_email_status == 'false') &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="mobileSuccessMob == false"
      @click="submit"
     class="mb-3"
    >
      Submit 1
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
       fa_email_status=='true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="emaileSuccessemail == false"
      @click="submit"
     class="mb-3"
    >
      Submit 2
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="GASuccess == false"
      @click="submit"
      class="mb-3"
    >
      Submit 3
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        fa_email_status == 'true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="mobileSuccessMob == false || emaileSuccessemail == false"
      @click="submit"
     class="mb-3"
    >
      Submit 4
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="mobileSuccessMob == false || GASuccess == false"
      @click="submit"
     class="mb-3"
    >
      Submit 5
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        fa_email_status == 'true' &&
        fa_ga_status == 'true'
      "
      :disabled="emaileSuccessemail == false || GASuccess == false"
      @click="submitTestNew"
     class="loginbtn btn "
    >
      Submit 6
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        fa_email_status == 'true' &&
        fa_ga_status == 'true'
      "
      :disabled="
       emaileSuccessemail == false ||
        GASuccess == false ||
        mobileSuccessMob == false
      "
      @click="submit"
      class="mb-3"
    >
      Submit  7
    </button>

          <button class="second-btn mb-3" @click="cyptothreeclose">
            Cancel
          </button>
           <button   @click="submitTest">Submit Test</button>
         
        </div>
      </template>
    </modal>
    <modal ref="successwithdrowmodal" class="modal2-modal border50">
      <template v-slot:header>
        <img src="images/icons/correct.png" class="middle-img" />
      </template>
      <template v-slot:body>
        <withdrawal-submitted 
          :selectCoin="state.selectCoin"
          :withdrawAddress="state.withdrawAddress"
          :network="state.network" 
          :withdrawAmount="state.withdrawAmount"
          :free="free"
          :balanceSymbol="balanceSymbol"
          />
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
import useValidate from '@vuelidate/core'
import { required , numeric} from '@vuelidate/validators'
import { reactive, computed } from 'vue'
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
    setup() {
        const state = reactive({
          selectCoin:"",
          withdrawAddress:"",
          network:"",
          withdrawAmount:null,
          
           
        })

        const rules = computed(() => {
            return {
                selectCoin: { required  },
                withdrawAddress: { required  },
                 network: { required  },
                 withdrawAmount:{required,numeric}
           }    
        }) 
        
        const v$ = useValidate(rules, state)
        return { state, v$ }
    }, 
  data() {
    return {
      shownetwork: false,
      coin: [],
     
      selectedsingkeCoin: "",
      cryptoAll: [],
      fee: "",
      max: "",
      main: "",
      withdraw_limit_day: "",

      coinBalances:[],
      balance:"",
      balanceSymbol:"",
      symbolEvent:"",
       fa_mobile_status: "",
      fa_email_status: "",
      fa_ga_status: "",
      GASuccess: false,
      emaileSuccessemail: false,
      mobileSuccessMob: false,
    };
  },
  methods: {

   
    actionwithorw() {
      this.shownetwork = true;
    },
    actionwithorwsecuritymodal() {

            this.v$.selectCoin.$touch()
            this.v$.withdrawAddress.$touch()
            this.v$.network.$touch()
            this.v$.withdrawAmount.$touch()

            if(!this.v$.selectCoin.$error &&  !this.v$.withdrawAddress.$error && !this.v$.network.$error && !this.v$.withdrawAmount.$error){
                this.$refs.CryptoThreeModal.openModal();
            }
   
    },
    withrowsuccessmodal() {
      this.$refs.CryptoThreeModal.closeModal();
      this.$refs.successwithdrowmodal.openModal();
    },
    OpenWithdrowDetailModal() {
      this.$refs.successwithdrowmodal.closeModal();
      //this.$refs.WithdrowDetailModal.openModal();
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
        this.state.selectCoin = this.selectedsingkeCoin;
        
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
            if (this.cryptoAll[i]["symbol"] == this.state.selectCoin) {
              this.free = this.cryptoAll[i].withrow_settings.fee;
              this.max = this.cryptoAll[i].withrow_settings.max;
              this.min = this.cryptoAll[i].withrow_settings.min;
              this.withdraw_limit_day =this.cryptoAll[i].withrow_settings.withdraw_limit_day;
            }
          }

          for (let t = 0; t < this.coinBalances.length; t++) {
          if(this.coinBalances[t]["symbol"]==this.state.selectCoin){
            this.balance=this.coinBalances[t]["balance"]
            this.balanceSymbol=this.coinBalances[t]["symbol"]
          }

        }
        })
        .catch(function (error) {
          console.log(error);
          
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

    async withdrawValidation(){
       this.v$.withdrawAmount.$touch()

            if(!this.v$.withdrawAmount.$error){
                console.log("Numbers Only")
            }
    },

     async labalStatus() {
      
      this.fa_mobile_status = localStorage.getItem("fa_mobile_status");
      this.fa_email_status = localStorage.getItem("fa_email_status");
      this.fa_ga_status = localStorage.getItem("fa_ga_status");
     

      
      
    },
async submit(){

        console.log(this.free)
          var data = {
                "currency":this.state.selectCoin,
                "fee_per":this.free,
                "fees_amt":this.free*this.state.withdrawAmount,
                "payment_method":`${this.state.selectCoin} Payment`,
                "withdraw_amount":this.state.withdrawAmount,
                "wallet_address":this.state.withdrawAddress
                      };


        let hed = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "X-LDX-Inspira-Access-Token"
            )}`,
            "Content-Type": "application/json",
          },
        };

          let response = await this.axios
          .post("https://dapi.exus.live/api/mobile/v1/wallet/withdrow/crypto", data, hed)
          .then((res) => {
          
            console.log(res);
            console.log(response);
            this.$refs.CryptoThreeModal.closeModal();
            this.$refs.successwithdrowmodal.openModal();
          
          })
          .catch(function (error) {
            console.log(error);
          });
},




   
  },
  watch:{
   // this.getGASuccess()
  //   this.getMBSuccess()
   //  this.getEmailSuccess()
   getGASuccess: function (ga) {
      this.GASuccess = ga


    },
     getMBSuccess: function (mb) {
      this.mobileSuccessMob = mb
    },
     getEmailSuccess: function (eml) {
      this.emaileSuccessemail = eml
    },
    
  },

  mounted() {
    this.coinBalances=JSON.parse(localStorage.getItem("totalBalances"));
    this.getCoins();
    this.labalStatus()
     
   
  },


};
</script>

<style lang="scss" scoped>
@import "Crypto.scss";
</style>