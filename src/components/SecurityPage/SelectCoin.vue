<template>
  <div class="inner-guard">
    <!-- <p>Select Coin</p>  -->
    <div class="form-field">
    <p class="labels">Select Coin </p>
      <div class="dropdown-area">
        <div class="dropdown-title" @click="dropdowntoggle">
          <img :src="this.selectedsymbol" width="28" />
          {{ this.selectedcoin}}
          <i class="ri-arrow-down-s-line" :class="[showdropdown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
          </div>
        <div class="dropdown-content" v-if="showdropdown">
          <!-- <input type="hidden" v-model="state.selectCoin" /> -->
            <ul>
              <li @click="getvalue(coins.symbol, coins.image)"
                v-for="coins in arrayCoins"
                :key="coins.symbol"
                :value="coins.symbol"
                >
                <img :src="coins.image" />
                {{ coins.symbol }}
                </li>
            </ul>
        </div>
    </div>

      <!-- <select
        class="form-control "
        v-model="selectCoin"
        @change="onChange($event)"
      >
        <option
       
          v-for="coins in arrayCoins" 
          :key="coins.symbol"
          :value="coins.symbol"
         
        >
          {{ coins.symbol }} 
        </option>
      </select> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ["ads","depositCoin","min_deposite","avg_arrival_time","exp_arrival","exp_unlock"], 
  data() {
    return {
      createdAddress: [],
      selectCoin: "",
      arrayCoins: [],

      showdropdown: false,
      selectedcoin: '',

      selectedsingkeCoin: "", 
      cryptoAll: [],
      minimum_deposite: "",
      avarege_arrival_time: "",
      expected_arrival: "",
      expected_unlock: "",

      onChangeCoin: "",
    };
  },

  methods: {
    async getvalue(symbol, image) {
      this.selectedcoin = symbol;
      this.selectedsymbol = image;
      this.showdropdown = false;
      this.onChangeCoin = symbol;
       this.$emit("depositCoin", symbol);
     
       var data = {
        currency: symbol,
      };
       let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/wallet/create/crypto",
        data,
        hed
      );
      console.log(response);
      this.createdAddress = response.data.address;
      localStorage.setItem("createdAddressSelectList", this.createdAddress);

      this.$emit("AddList", this.createdAddress);
      
      this.getCryptoAll();
    },      
    async getCoins() {
      this.arrayCoins = JSON.parse(localStorage.getItem("arraySymbol"));

      this.selectedsingkeCoin = JSON.parse( localStorage.getItem("selectedCoin")
      );

      if (this.selectedsingkeCoin != null) {
        this.selectCoin = this.selectedsingkeCoin;
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
         

          for (let j = 0; j < this.cryptoAll.length; j++) {
            if (this.arrayCoins[j]["symbol"] == this.cryptoAll[j]["symbol"]) {
                this.arrayCoins[j]["image"] =  this.cryptoAll[j]["image"];
            }
          }

   })
        .catch(function (error) {
          console.log(error);
         
        });


    },
  //  async onChange(event) {
      //this.onChangeCoin = event.target.value;
     // localStorage.setItem("depositSelectCoin", event.target.value);
     // this.$emit("depositCoin", event.target.value);


      // var data = {
      //   currency: event.target.value,
      // };

      // let hed = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      //     "Content-Type": "application/json",
      //   },
      // };
      // let response = await this.axios.post(
      //   "https://dapi.exus.live/api/mobile/v1/wallet/create/crypto",
      //   data,
      //   hed
      // );
      // console.log(response);
      // this.createdAddress = response.data.address;
      // localStorage.setItem("createdAddressSelectList", this.createdAddress);

      // this.$emit("AddList", this.createdAddress);
      
      // this.getCryptoAll();
  //  },
    async pageLoad() {
      var data = {
        currency: this.selectedsingkeCoin,
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/wallet/create/crypto",
        data,
        hed
      );

      this.createdAddress = response.data.address;
      localStorage.setItem("createdAddressSelectList", this.createdAddress);

      this.$emit("AddList", this.createdAddress);
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
         console.log(this.cryptoAll)

          for (let j = 0; j < this.cryptoAll.length; j++) {
            if (this.cryptoAll[j]["symbol"] == this.onChangeCoin) {
              this.minimum_deposite = this.cryptoAll[j]["minimum_deposite"];
              this.avarege_arrival_time = this.cryptoAll[j]["avarege_arrival_time"];
              this.expected_arrival = this.cryptoAll[j]["expected_arrival"];
              this.expected_unlock = this.cryptoAll[j]["expected_unlock"];
            }
          }

          localStorage.setItem("minimum_deposite", this.minimum_deposite);
          localStorage.setItem("avarege_arrival_time", this.avarege_arrival_time);
          localStorage.setItem("expected_arrival", this.expected_arrival);
          localStorage.setItem("expected_unlock", this.expected_unlock);

           this.$emit("min_deposite", this.minimum_deposite);
            this.$emit("avg_arrival_time", this.avarege_arrival_time);
             this.$emit("exp_arrival", this.expected_arrival);
              this.$emit("exp_unlock", this.expected_unlock);

          


        })
        .catch(function (error) {
          console.log(error);
         
        });
    },
    dropdowntoggle() {
     this.showdropdown = !this.showdropdown
    }
  },

  mounted() {
    this.getCoins();
    this.pageLoad();
    //this.getCryptoAll();
  },
};
</script>

<style>


</style>