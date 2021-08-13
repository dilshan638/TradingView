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
                <p>Select Coin</p>
                <select placeholder="BTC-BITCOIN" class="form-control">
                  <option value="BTC-BITCOIN">BTC-BITCOIN</option>
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
                <p>Network</p>
                <input
                  type="text"
                  placeholder="BTC-BITCOIN"
                  class="form-control"
                />
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

          <div>
            <modal ref="CryptoThreeModal">
              <template v-slot:header>
                <h2 style="color: black">Security Verification</h2>
              </template>

              <template v-slot:body>
                <div class="form-group mb-4">
                  <div class="eye-area">
                    <input
                      class="form-control"
                      placeholder="Mobile verification code"
                    />
                  </div>
                </div>

                <div class="eye-area mb-4">
                  <input placeholder="Email verification code" class="form-control" />
                  <div class="eye-box">
                  </div>
                </div>

                <div class="eye-area mb-4">
                  <input
                    placeholder="Mobile verification code"
                    class="form-control"
                  />
                  <div class="eye-box">
  
                  </div>
                </div>

                <div class="form-group">
                  <div class="eye-area"></div>
                </div>
              </template>

              <template v-slot:footer>
                <div>
                  <button @click="cyptothreeclose">Next</button>
                </div>
              </template>
            </modal>
          </div>

          <button @click="cyptothree">Withdraw</button>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "../../layout/DefaultLayout.vue";
import Modal from "../Modal/Modal.vue";
export default {
  name: "CryptoTwo",
  components: {
    DefaultLayout,
    Modal,
  },
  mounted() {},
  methods: {
    cyptothree() {
      this.$refs.CryptoThreeModal.openModal();
    },
    cyptothreeclose() {
      this.$refs.CryptoThreeModal.closeModal();
    },
  },
};
</script>

<style >
</style>