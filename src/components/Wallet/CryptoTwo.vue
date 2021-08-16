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

                <select placeholder="BTC-BITCOIN" class="form-control">
                  <option value="BTC-BITCOIN">BTC-BITCOIN</option>
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
                <p class="labels">Network</p>

                <select placeholder="BTC-BITCOIN" class="form-control">
                  <option value="BTC-BITCOIN">BTC-BITCOIN</option>
                </select>
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
                    <button class="btn" @click="cyptothree">Withdraw</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal ref="CryptoThreeModal" class="Security-modal">
      <template v-slot:header>
        <h2 class="Security-Verification">Security Verification</h2>
      </template>

      <template v-slot:body>
        <div class="row">
          <div class="col-md-12">
            <div class="card Security-model">
              <div class="card-body Security-model">
                <div class="row">
                  <div class="col-md-3">
                    <p class="Card-ph">Amount</p>
                  </div>
                  <div class="col-md-9">
                    <p class="Card-ph-2">0.37,434.74 BTC (Network Fee)</p>
                  </div>

                  <div class="col-md-3">
                    <p class="Card-ph">Address</p>
                  </div>
                  <div class="col-md-9">
                    <p class="Card-ph-2">34KMALZ4jlMLMmsu5NFg4SZ</p>
                  </div>

                  <div class="col-md-3">
                    <p class="Card-ph">Network</p>
                  </div>
                  <div class="col-md-9">
                    <p class="Card-ph-2">BTC - Bitcoin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p class="Paragraph-Line">
              Please enter the 6 Digit code that we have sent a to +9477***121
            </p>
          </div>

          <div class="row">
             <div class="col-md-11 ">
              <div class="form-group Modal-Textfiel">
               <p class="labels">Withdraw to</p>
                <input
                  type="text"
                  placeholder="Mobile verification code"
                  class="form-control"
                />
              </div>

              <p class="Didnt-received-Resend">
                Didn't received? <a href="#">Resend</a>
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <p class="Paragraph-Line">
              Please enter the 6 Digit code that we have sent a to ab**@**.com
            </p>
          </div>

          <div class="row">
            <div class="col-md-11 ">
              <div class="form-group Modal-Textfiel">
                <p class="labels">Withdraw to</p>
                <input
                  type="text"
                  placeholder="Email verification code"
                  class="form-control"
                />
              </div>

              <p class="Didnt-received-Resend">
                Didn't received? <a href="#">Resend</a>
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <p class="Paragraph-Line">
              Please enter the 6 Digit code from Google Authenticator.
            </p>
          </div>

          <div class="row">
           <div class="col-md-11 ">
              <div class="form-group Modal-Textfiel">
               <p class="labels">Withdraw to</p>
                <input
                  type="text"
                  placeholder="Email verification code"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3" @click="cyptothreeclose">Send Now</button>
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

<style lang="scss" scoped>
@import "Crypto.scss";
</style>