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
                     <div class="dropdown-area">
                        <div class="dropdown-title" @click="dropdowntoggle">
                          <img :src="selectedsymbol" width="28" />
                          {{ selectedcoin}}
                          <i class="ri-arrow-down-s-line" :class="[showdropdown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
                          </div>
                        <div class="dropdown-content" v-if="showdropdown" @blur="hidedropdownsymbol">
                          <!-- <input type="hidden" v-model="state.selectCoin" /> -->
                            <ul>
                              <li @click="getvalue(coins.symbol, coins.image)"
                                v-for="coins in coin"
                                :key="coins.symbol"
                                :value="coins.symbol"
                               
                                >
                                <img :src="coins.image" />
                                {{ coins.symbol }}
                                </li>
                            </ul>
                            
                        </div>
                          <!-- <span class="error-msg" v-if="v$.selectCoin.$error">{{ v$.selectCoin.$errors[0].$message }} </span> -->
                    </div>
                    
                    <!-- <select
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
                    </select> -->
                    
                 
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
                      @blur="validateAddress"
                    
                     
                    />
                     <span class="error-msg" v-if="v$.withdrawAddress.$error">{{ v$.withdrawAddress.$errors[0].$message }} </span>
                  <span class="error-msg clr" v-show="addressValid=='true'">{{ successMsg  }} </span>
                   <span class="error-msg" v-show="addressValid=='false'">{{ errorMsg }} </span>
                 
                  </div>
                </div>
              </div>
              <div class="row" >
                <div class="col-md-12">
                  <div class="form-group pos-rel multi-group mb-4">
                    <p class="labels">Network</p>
                    <select placeholder="Network" class="form-control" v-model="state.network" @change="networkClick">
                       <option value="" disabled selected>Select network</option>
                      <option :value="symNetwork">{{symNetwork}}-{{sybName}}</option> 
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
                      type="number"
                      placeholder="Amount"
                      class="form-control"
                      v-model="state.withdrawAmount"
                      @input="withdrawValidation"
                    />
                    <span class="error-msg" v-if="v$.withdrawAmount.$error">{{ v$.withdrawAmount.$errors[0].$message }} </span>
                 
                    <p class="bottom-grey">{{balance}} {{balanceSymbol}} available</p>
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

            <div class="col-md-4" v-show="displayCard=='true'">
              <div class="card amount-card">
                <div class="card-body crd">
                  <div class="Receive-Amount">
                    <p class="Receive-Amount-p">Receive Amount</p>
                    <div class="row">
                      <div class="col-md-9">
                        <p class="Values">{{state.withdrawAmount-free}} <span>{{balanceSymbol}}</span></p>
                      </div>
                    </div>
                  </div>
                  <p class="BTC-network-fee-included">
                    {{free}} {{balanceSymbol}} network fee included
                  </p>
                </div>
                <div>
                 
                  <button
                    class="btn"
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
        <div>
        <div class="row">
        <div class="col-md-12">
            <div class="card Security-model">
            <div class="card-body Security-model mb-0">
                <div class="row">
                <div class="col-md-3">
                    <p class="Card-ph">Amount</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{state.withdrawAmount}}  {{state.selectCoin}} (Network Fee {{free}} {{balanceSymbol}})</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph">Address</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{state.withdrawAddress}}</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph pb-0">Network</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2 pb-0">{{state.network}}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

        <!-- Mobile -->
    <div class="form-group pos-rel sec-row mb-3 mt-3" v-if="fa_mobile_status== 'true'">
        <p class="sub-text">Please enter the  6 Digit code that we have sent a to  +9477***121</p>
        <div class="input-group mb-2">
               <input
        type="text"
        class="form-control"
        placeholder="Enter mobile verfication code"
        v-model="mobileCodeMob"
        @input="mobileCodeSubmit"
        :disabled="mobileSuccessMob == true"
      />
       <img
        v-if="mobileSuccessMob && !mobileWrongMob"
        src="images/icons/correct.png"
        class="pos-img"
      />
      <img
        v-if="mobileWrongMob"
        src="images/icons/ic_fail@3x.webp"
        class="pos-img"
      />
           <div class="input-group-append">
            <button class="btn btn-outline-secondary" v-if="btnMob" @click="sendMobileCode" style="margin-top: 0rem; margin-left: 0rem;" type="button">Send</button>
            </div>
        </div>
        <p v-if="!mobileSuccessMob" class="sub-text text-right">Didn't received? <a class="link" @click="sendMobileCode">Resend</a></p>
    </div>

      <!-- Email -->
    <div class="form-group pos-rel sec-row">
        <p class="sub-text">Please enter the  6 Digit code that we have sent a to  dil**@**.com</p>
        <div class="input-group mb-2">
            <input
            v-model="emailCode"
            class="form-control"
            placeholder="Email verification code"
            @input="emailCodeSubmit"
            :disabled="emaileSuccessemail == true"
          />
             <img
                   v-if="emaileSuccessemail && !emailWrongEmail"
                  src="images/icons/correct.png"
                  class="pos-img error-imgs"  />
              <img
                  v-if="emailWrongEmail"
                  src="images/icons/ic_fail@3x.webp"
                  class="pos-img" />  

            <div class="input-group-append">
            <button class="btn btn-outline-secondary"  v-if="btnEmail" @click="senEmailCode" style="margin-top: 0rem; margin-left: 0rem;" type="button">Send</button>
            </div>
        </div>
        <p v-if="!emaileSuccessemail" class="sub-text text-right">Didn't received? <a class="link" @click="senEmailCode">Resend</a></p>
    </div>  

      <!-- GA -->

    <div class="row mt-3" v-if="fa_ga_status== 'true'">
        <div class="col-md-12 ">
        <p class="Paragraph-Line sub-text">Please enter the 6 Digit code from Google Authenticator</p>             
        <div class="form-group Modal-Textfiel pos-rel">
             <input
                type="text"
                class="form-control"
                placeholder="Enter Google Authenticator code"
                v-model="googleAuthenticationCode"
                @input="submitGACode"
                :disabled="GASuccess == true"  />
              <img
                v-if="GASuccess && !GAWrong"
                src="images/icons/correct.png"
                class="pos-img"
              />
               <img v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
      
        </div>
        </div>
    </div>

 
   
    
    
   </div>
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
    class="loginbtn btn btnWLT "
    >
      Submit 
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
       fa_email_status=='true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="emaileSuccessemail == false"
      @click="submit"
    class="loginbtn btn btnWLT "
    >
      Submit 
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="GASuccess == false"
      @click="submit"
     class="loginbtn btn btnWLT "
    >
      Submit 
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        fa_email_status == 'true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="mobileSuccessMob == false || emaileSuccessemail == false"
      @click="submit"
    class="loginbtn btn btnWLT "
    >
      Submit 
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="mobileSuccessMob == false || GASuccess == false"
      @click="submit"
   class="loginbtn btn btnWLT "
    >
      Submit 
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        fa_email_status == 'true' &&
        fa_ga_status == 'true'
      "
      :disabled="emaileSuccessemail == false || GASuccess == false"
      @click="submit"
     class="loginbtn btn btnWLT "
    >
      Submit 
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
     class="loginbtn btn btnWLT "
    >
      Submit  
    </button>
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

import WithdrawalSubmitted from "./WithdrawalSubmitted.vue";
import Modal from "../Modal/Modal.vue";
// import WithdrowDetail from "./WithdrowDetail.vue";
import useValidate from '@vuelidate/core'
import { required , numeric} from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import axios from "axios";
//import WAValidator from'wallet-address-validator';
//const WAValidator = require('@swyftx/api-crypto-address-validator')

export default {
  name: "CryptoOne",
  components: {
    DefaultLayout,
    Modal,
    
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
      selectedcoin: "Select a coin",
      selectedsymbol: "images/icons/coin.png",

       showdropdown: false,

        emailWrongEmail: false,
          mobileWrongMob: false,
          GAWrong: false,

           btnEmail:true,
           btnMob:true,
            emailCode:"",
           mobileCodeMob:"",
           googleAuthenticationCode:"",
           token:"",
           phone_number:"",
           displayCard:"",
           free:"",
           min:"",

           addressValid:"",
           successMsg:"Valid address",
           errorMsg:"Invalid address"  ,
           trcAddress:"",

           symNetwork:"",
           sybName:""
         
    };
  },
  methods: {

    dropdowntoggle() {
     this.showdropdown = !this.showdropdown
   },
   hidedropdownsymbol() {
    
     this.showdropdown = false
   },

   cyptothreeclose(){
     this.$refs.CryptoThreeModal.closeModal();
   },
    actionwithorw() {
      this.shownetwork = true;
    },
  async  actionwithorwsecuritymodal() {
      // const WAValidator = require('@swyftx/api-crypto-address-validator')

      this.$refs.CryptoThreeModal.openModal();
            // this.v$.selectCoin.$touch()
            // this.v$.withdrawAddress.$touch()
            // this.v$.network.$touch()
            // this.v$.withdrawAmount.$touch()
            //   if(!this.v$.selectCoin.$error &&  !this.v$.withdrawAddress.$error && !this.v$.network.$error && !this.v$.withdrawAmount.$error){
               
            //    if(this.balance>this.state.withdrawAmount && this.state.withdrawAmount>this.free && (this.addressValid=='true' ||  this.trcAddress=='true' )){                
            //            this.$refs.CryptoThreeModal.openModal();
            //         }                 
            //         else
            //         {
            //        this.$toast.show("Please Check Your Account Balance", {type: "info", position: "top"});  
            //       }  
            // }
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
        
          console.log(this.coinBalances);

          for (let i = 0; i < this.cryptoAll.length; i++) {
            if (this.cryptoAll[i]["symbol"] == this.state.selectCoin) {
              this.free = this.cryptoAll[i].withrow_settings.fee;
              this.max = this.cryptoAll[i].withrow_settings.max;
              this.min = this.cryptoAll[i].withrow_settings.min;
              this.withdraw_limit_day =this.cryptoAll[i].withrow_settings.withdraw_limit_day;
            }

            if (this.coin[i]["symbol"] == this.cryptoAll[i]["symbol"]) {
                this.coin[i]["image"] =  this.cryptoAll[i]["image"];
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
    // async onChange(event) {
    // },
    async withdrawValidation(){
      // this.v$.withdrawAmount.$touch()

 
       if(!this.v$.withdrawAddress.$error && this.addressValid=='true' && this.state.withdrawAddress!='' && this.balance>this.state.withdrawAmount && this.state.withdrawAmount>0 && this.state.network !='' ){


           this.displayCard="true"
       }else{
          this.displayCard="false"
       }

      //  if(this.state.withdrawAmount=='' ||this.state.withdrawAmount==null  ) {
      //     this.displayCard="false" 
      //  } else {
      //     this.displayCard="true"
      //  }
    },
    async labalStatus() {
      this.fa_mobile_status = localStorage.getItem("fa_mobile_status");
      this.fa_email_status = localStorage.getItem("fa_email_status");
      this.fa_ga_status = localStorage.getItem("fa_ga_status");
      this.phone_number= localStorage.getItem("phone_number");
    },
    async getvalue(symbol, image) {

    
    if(symbol==''){
       localStorage.setItem("syb",'')
    }else{
          localStorage.setItem("syb",symbol) 
    }
   
      this.symNetwork= localStorage.getItem("syb")

      this.selectedcoin = symbol;
      this.selectedsymbol = image;
      this.showdropdown = false;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };
      axios.get("https://dapi.exus.live/api/mobile/v1/wallet/all/crypto", {headers: headers, })
      .then((response) => {
        this.cryptoAll = response.data[0];
        console.log(this.cryptoAll)
      
        for (let i = 0; i < this.cryptoAll.length; i++) {
          if (this.cryptoAll[i]["symbol"] == symbol) {
            this.free = this.cryptoAll[i].withrow_settings.fee;
            this.max = this.cryptoAll[i].withrow_settings.max;
            this.min = this.cryptoAll[i].withrow_settings.min;
            this.withdraw_limit_day =
            this.cryptoAll[i].withrow_settings.withdraw_limit_day;
            this.sybName=this.cryptoAll[i].name
          }
        }
      for (let t = 0; t < this.coinBalances.length; t++) {
        if(this.coinBalances[t]["symbol"]==symbol){
          this.balance=this.coinBalances[t]["balance"]
          this.balanceSymbol=this.coinBalances[t]["symbol"]
        }

      }
    
      })
      .catch(function (error) {
        console.log(error);  
      });
      this.validateAddress()   
         
    },
     async senEmailCode(){
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
      axios
        .get("https://dapi.exus.live/api/twofa/email/code", {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
           this.$toast.show("Successfully  Send Email Verification Code", {type: "success", position: "top"});
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     async sendMobileCode(){
         var data = {
        mobile:   localStorage.getItem('phone_number' ),
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/sms/code",
        data,
        hed
      ).then((res) => {
          console.log(res);
          console.log(response)
          this.$toast.show("Successfully  Send Mobile Verification Code", {type: "success", position: "top"});
        })
        .catch(function (error) {
          console.log(error);
        });
       
       
    },
    async emailCodeSubmit() {
      this.emailWrongEmail = true;
      
       this.btnEmail=false

      if (this.emailCode.length == 6) {
        var data = {
          token: this.emailCode,
          status: "withdraw",
          stage: 3,
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
          .post("https://dapi.exus.live/api/twofa/email/status", data, hed)
          .then((res) => {
            console.log(res);
            console.log(response);
           
            this.emailWrongEmail = false;
            this.emaileSuccessemail = true;
              
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    async mobileCodeSubmit() {
      this.mobileWrongMob = true;
      this.mobileLabal = false;
      this.btnMob=false
      if (this.mobileCodeMob.length == 6) {
        var data = {
          mobile: this.phone_number,
          code: this.mobileCodeMob,
          status: "withdraw",
          stage: 3,
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
          .post("https://dapi.exus.live/api/twofa/sms/status", data, hed)
          .then((res) => {
            console.log(res);
            console.log(response);
            this.mobileSuccessMob = true;
            this.mobileWrongMob = false;
            
          })
          .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      }
    },
     async tokenGA() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
      axios
        .get("https://dapi.exus.live/api/twofa/generate/ga/qr", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          this.token = response.data.secretdata.split(
            "otpauth://totp/Inspira?secret="
          );
          console.log(this.token[1]);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    async submitGACode() {
      this.GAWrong = true;
      if (this.googleAuthenticationCode.length == 6) {
        let hed = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "X-LDX-Inspira-Access-Token"
            )}`,
            "Content-Type": "application/json",
          },
        };

        let response = await this.axios
          .post(
            "https://dapi.exus.live/api/twofa/ga/status",
            {
              secret: this.token[1],
              token: this.googleAuthenticationCode,
              status: "withdraw",
              stage: 3,
            },
            hed
          )
          .then((res) => {
            this.GASuccess = true;
            this.GAWrong = false;
            console.log(res);
            console.log(response);
           

         
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    async submit() {
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
   async validateAddress(){
     
              const WAValidator = require('@swyftx/api-crypto-address-validator')
                    var valid = WAValidator.validate(this.state.withdrawAddress ,  this.symNetwork);
              
                      if( this.state.selectCoin !='TRC' && this.state.withdrawAddress !=''){
                          if(valid) {	  
                            
                            this.addressValid='true'
                          }
                      else
                        { 
                          
                          this.addressValid='false'
                        }
                      }
                      

                      if( this.state.selectCoin=='TRC'){
                          this.trcAddress='true'
                      }

                      this.withdrawValidation()
   },

   async  networkClick(){
     this.withdrawValidation()
   }
  },
  mounted() {
    this.coinBalances=JSON.parse(localStorage.getItem("totalBalances"));
    this.getCoins();
    this.labalStatus();
    this.tokenGA()
  
  },
};
</script>

<style lang="scss" scoped>
@import "Crypto.scss";
.btnWLT{
  margin-top: 27px;
  margin-right: 15px;
}
.clr{
  color: greenyellow;
}
</style>