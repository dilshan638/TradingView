<template>
  <default-layout>
    <div class="card only-card-header">
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
            <div class="col-md-6">
              <div class="form-group pos-rel mb-4">
                <p class="labels">Select Coin</p>
             
                <select placeholder="BTC-BITCOIN" class="form-control  ">
                  <option  value="BTC-BITCOIN" >BTC-BITCOIN</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group pos-rel mb-4">
                <p class="labels">Withdraw to</p>
                <input type="text" placeholder="Address" class="form-control" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group pos-rel mb-4">
                <p class="labels">Withdraw Amount</p>
                <input type="text" placeholder="Amount" class="form-control" />
                <p class="BTC-available">0.34423442 BTC available</p>

                <div class="row">
                  <div class="col-md-8">
                    <p class="BTC-spot-balance">BTC spot balance</p>
                     <p class="BTC">0.34423442 BTC</p>
                  </div>
                  <div class="col-md-4">
                    <p class="BTC-spot-balance">Minimum withdrawal</p>
                     <p class="BTC">0.0000010 BTC</p>
                  </div>
                </div>

                 <div class="row">
                  <div class="col-md-8">
                    <p class="BTC-spot-balance">Network fee</p>
                     <p class="BTC">0.0000005 BTC</p>
                  </div>
                  <div class="col-md-4">
                    <p class="BTC-spot-balance">24h remaining limit</p>
                     <p class="BTC">0 BTC/0 BTC</p>
                  </div>
                </div>
              </div>
            </div>

            

            <div class="col-md-6">
              <div class="card">
                <div class="card-body crd">
                  <div class="Receive-Amount">
                    <p class="Receive-Amount-p">Receive Amount</p>
                    <div class="row">
                      <div class="col-md-9">
                        <p class="Values">0.37,434.74</p>
                      </div>
                      <div class="col-md-3">
                        <p class="btc">BTC</p>
                      </div>
                    </div>
                  </div>
                  <p class="BTC-network-fee-included">
                    0.0000005 BTC network fee included
                  </p>
                </div>
                <div>
                  <router-link to="/wallet/cryptotwo">
                    <button class="btn">Withdraw</button>
                  </router-link>
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
import DefaultLayout from "../../layout/DefaultLayout.vue";
export default {
  name: "CryptoOne",
  components: {
    DefaultLayout,
  },
};
</script>

<style lang="scss" scoped>
@import "Crypto.scss";


</style>