<template>
  <default-layout>
    <div class="card only-card-header">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="mol-md-12">
              <h2>Withdraw Crypto</h2>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group pos-rel mb-4">
                <p>Select Coin </p>

                <select placeholder="BTC-BITCOIN" class="form-control">
                  <option value="BTC-BITCOIN" >BTC-BITCOIN  </option>
              
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group pos-rel mb-4">
                <p>Withdraw to</p>
                <input type="text" placeholder="Address" class="form-control" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group pos-rel mb-4">
                <p>Withdraw Amount</p>
                <input type="text" placeholder="Amount" class="form-control" />
              </div>
            </div>
          </div>
          <router-link to="/wallet/cryptotwo">
            <button>Withdraw</button>
          </router-link>
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

<style>
img.btc {
  width: 1.687rem;
  height: 1.687rem;
  margin: 0 0.75rem 0 0;
  object-fit: contain;
}

</style>