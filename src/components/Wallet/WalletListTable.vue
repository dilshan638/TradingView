<template>
  <div>
    <div class="card table-card wallet-list-table">
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
            <div class="table-responsive">
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

                  <td class="text-right">{{ marketPrice * crypto.amount }}</td>
                  <td class="text-right">
                    {{ crypto.amount }}
                  </td>
                  <td class="action-td">
                      <router-link to="/securitypage" @click="selectedCoin(crypto.symbol)">
                       Deposit
                      </router-link>
                      <router-link to="/withdraw-crypto" @click="selectedCoinWithdraw(crypto.symbol)">
                       Withdraw
                      </router-link>
                    <a
                      v-if="crypto.address == ''"
                      class="clr"
                      @click="openModal(crypto.symbol)"
                      style="margin-left:15px"
                    >
                      Create Wallet
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal ref="createAddressModal" class="Security-modal">
      <template v-slot:header>
        <h2 class="Security-Verification">Create Digital Wallet?</h2>
      </template>

      <template v-slot:body>
        <div class="row">
          <div class="col-md-12">
            <img class="icon2" src="images/icons/ic_new_wallet@3x.webp" />

            <p class="black">
              Before you can use this asset, you will need to create a Digital
              Wallet that can store this particular asset and record
              transactions.
            </p>

            <p class="black">
              Setup is quick and easy, Simply click on the "Create New Wallet"
              Button below and we will automatically begin the wallet creation
              process, once complete we will notify you.
            </p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn button2">
          <button class="mb-3" @click="createAddress">Create Wallet</button>
          <button class="second-btn mb-3" @click="closeModal">Cancel</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../Modal/Modal.vue";

export default {
  data() {
    return {
      cryptoAll: [],
      usergetCrypto: [],
      marketPrice: 0,
      selectedCurrency: "",
      allSymbol: [],
      arraySymbol: [],
      arrayCoinsLocalStorage: [],
      createdAddress: "",
      arrayTemp: [],

      arrayAddress: [],
      arrayAddress2: [],
      arrayAddress3: [],
      arrayAddress4: [],

      arraySymbolWithInAddress: [],

    
     

    };
  },

  components: {
    Modal,
  },

  methods: {
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

              this.arrayAddress4 = JSON.parse(
                localStorage.getItem("AddressListArray")
              );
              for (let i = 0; i < this.cryptoAll.length; i++) {
                this.cryptoAll[i]["amount"] = this.usergetCrypto[i]["amount"];
                this.cryptoAll[i]["address"] = this.usergetCrypto[i]["address"];
              }

              if (this.arrayAddress4 == null) {
                console.log("Address Already Created..!!");
              } else {
                for (let j = 0; j < this.arrayAddress4.length; j++) {
                  if ( this.cryptoAll[j]["symbol"] == this.arrayAddress4[j]["symbol"]
                  ) {
                    this.cryptoAll[j]["address"] =  this.arrayAddress4[j]["address"];
                  }
                }
              }

              for (let z = 0; z < this.cryptoAll.length; z++) {
                if (this.cryptoAll[z]["address"] != null) {
                  this.arrayCoinsLocalStorage.push({symbol: this.cryptoAll[z]["symbol"]});
                  this.arraySymbolWithInAddress = this.arrayCoinsLocalStorage;
                }
              }

              localStorage.setItem(
                "arraySymbol",
                JSON.stringify(this.arraySymbolWithInAddress)
              );

              console.log(this.cryptoAll);
            });
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

   // async getMarketPrice() {
   //   var data = {
     //   pair: "BTC/USD",
     //   type: "buy",
    //  };

     // let hed = {
      //  headers: {
       //   Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
       //   "Content-Type": "application/json",
       // },
     // };
     // let response = await this.axios.post(
     //   "https://dapi.exus.live/api/mobile/v1//trade/marcket",
      //  data,
      //  hed
     // );
    //  this.marketPrice = response.data.price;

    
   // },

    async openModal(symbal) {
      this.selectedCurrency = symbal;

      this.arrayCoinsLocalStorage = JSON.parse(
        localStorage.getItem("arraySymbol")
      );

      if (this.arrayCoinsLocalStorage == null) {
        for (var i = 1; i <= 1; i++) {
          this.arraySymbol.push({ symbol: symbal });
        }

        this.arrayTemp = this.arraySymbol;
      } else {
        for (var j = 1; j <= 1; j++) {
          this.arrayCoinsLocalStorage.push({ symbol: symbal });
        }

        this.arrayTemp = this.arrayCoinsLocalStorage;
      }
      localStorage.setItem("arraySymbol", JSON.stringify(this.arrayTemp));

      this.$refs.createAddressModal.openModal();
    },

    closeModal() {
      this.$refs.createAddressModal.closeModal();
    },

    async createAddress() {
      var data = {
        currency: this.selectedCurrency,
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

      //this.arrayAddress= JSON.parse(localStorage.getItem("AddressListArray"));

      this.arrayAddress = JSON.parse(localStorage.getItem("AddressListArray"));

      if (this.arrayAddress == null) {
        for (var x = 1; x <= 1; x++) {
          this.arrayAddress3.push({
            symbol: this.selectedCurrency,
            address: this.createdAddress,
          });
        }
        localStorage.setItem(
          "AddressListArray",
          JSON.stringify(this.arrayAddress3)
        );
      } else {
        for (var c = 1; c <= 1; c++) {
          this.arrayAddress.push({
            symbol: this.selectedCurrency,
            address: this.createdAddress,
          });
        }
        localStorage.setItem(
          "AddressListArray",
          JSON.stringify(this.arrayAddress)
        );
      }

      this.$toast.show("Your address created successfully..!!", {
        type: "success",
        position: "top-right",
      });

      this.$refs.createAddressModal.closeModal();
    },

    async selectedCoin(symbol){
       localStorage.setItem("selectedCoin", JSON.stringify(symbol));


    },

    async selectedCoinWithdraw(symbol){
       localStorage.setItem("selectedCoinWithdraw", JSON.stringify(symbol));
    },

      
  },

  mounted() {
    this.getCryptoAll();
    //this.getMarketPrice();
  
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/wallet/wallet";

.clr {
  color: green;
}

.icon2 {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 30px;
  margin-top: 30px;
}

.black {
  color: black;
}

.button2 {
  margin-top: -20px;
}
</style>