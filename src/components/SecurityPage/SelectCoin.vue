<template>
  <div class="inner-guard">
    <p>Select Coin</p>
    <div class="form-field">
      <select class="form-control" v-model="selectCoin"  @change="onChange($event)" @click="$emit('ads',this.createdAddress)">
        <option disabled selected value>Select Coin</option>
        <option v-for="coins in coin" :key="coins.symbol" :value="coins.symbol">
          {{ coins.symbol }}
        </option>
      </select>

    
    </div>
  </div>
</template>

<script>
export default {

    
   emits:['ads'],
  data() {

   
    return {
      coin: [],
      createdAddress:[],
      selectCoin:''
    };

    
  },

  methods: {
    async getCoins() {
      this.coin = JSON.parse(localStorage.getItem("coin"));
    },

   

 async onChange(event) {
            console.log(event.target.value)
            var data = {
           currency: event.target.value,
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/wallet/create/crypto",
        data,
        hed
      );

      this.createdAddress = response.data.address;
      console.log(this.createdAddress);
      localStorage.setItem("createdAddressSelectList", this.createdAddress);
    
        }

    
  },

  mounted() {
    this.getCoins();
    
    
  },
};
</script>

<style>
</style>