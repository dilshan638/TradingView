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
                <select-coin @AddList="getPassingAddress"
                 @depositCoin="SelectSymbol"
                  @min_deposite="minDeposite" 
                  @avg_arrival_time="avgArrivalTime" 
                  @exp_arrival="expArrival" 
                  @exp_unlock="expUnlock"
                  />
              </div>
              <div class="col-xl-8">
                <div class="barcode-area">
                  <div class="barcode-img">
                    
                     <qrcode-vue
                      :value="addressList"
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
                      <b>Address  <i class="ri-file-copy-line" @click.stop.prevent="copyTestingCode"></i></b>
                      <p>{{ addressList }}</p>
                      <input type="hidden" id="testing-code" :value="addressList">
                    </li>

                    <li class="col-md-6">
                      <b>Minimum Deposit</b>
                     
                      <p v-show="minimum_deposite!=null" >{{minimum_deposite}} {{selectCoinSymbolDeposit}} </p>
                       <p v-show="minimum_deposite==null" >-- </p>
                       
                    </li>
                    
                    <li class="col-md-6">
                      <b>Average Arrival Time</b>
                      
                      <p v-show="avarege_arrival_time!=null">{{avarege_arrival_time}} Min </p>
                         <p v-show="avarege_arrival_time==null" >-- </p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected arrival</b>
                     
                      <p v-show="expected_arrival!=null" >{{expected_arrival}} network confirmations</p>
                         <p v-show="expected_arrival==null" >-- </p>
                    </li>
                    <li class="col-md-6">
                      <b>Expected Unlock</b>
                      
                      <p v-show="expected_unlock!=null">{{expected_unlock}}  network confirmations</p>
                         <p v-show="expected_unlock==null" >-- </p>
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
      //value: "otpauth://totp/SupremeCrypX?secret=ZZZQPGOCPUYLJDMP", 
      size: 142, 
      addressList: "",
       minimum_deposite: "",
      avarege_arrival_time: "",
      expected_arrival: "",
      expected_unlock: "",
      //qrdata:"",

      selectCoinSymbolDeposit:""
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

     async SelectSymbol(sym){
      this.selectCoinSymbolDeposit=sym
       console.log(sym)
    },

    async minDeposite(minDiposit){
        this.minimum_deposite=minDiposit
    },
     async avgArrivalTime(avaregeArrivalTime){
        this.avarege_arrival_time=avaregeArrivalTime
     },
      async expArrival(expectedArrival){
        this.expected_arrival=expectedArrival 
      },
       async expUnlock(expectedUnlock){
          this.expected_unlock=expectedUnlock
       },
    copyTestingCode () {
      let testingCodeToCopy = document.querySelector('#testing-code')
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      try {
        document.execCommand('copy');
        this.$toast.show("Address Copied to clipboard ", {type: "success", position: "top"});
      } catch (err) {
        this.$toast.show("Address not correct to copy to clipboard", {type: "error", position: "top"});
      }
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }  
  },
  mounted() {
    this.getAddress();
   // this.depositDetails()
     this.selectCoinSymbolDeposit = JSON.parse( localStorage.getItem("selectedCoin"))
     this.minimum_deposite = JSON.parse( localStorage.getItem("min_deposite"))
     this.avarege_arrival_time = JSON.parse( localStorage.getItem("avg_arrival_time"))
     this.expected_arrival = JSON.parse( localStorage.getItem("exp_arrival"))
      this.expected_unlock = JSON.parse( localStorage.getItem("exp_unlock"))
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