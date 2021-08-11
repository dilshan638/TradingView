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
              <div class="col-md-4">
                <select-coin/>
              </div>
              <div class="col-md-8">
                  <div class="barcode-area">
                    <div class="barcode-img"></div>
                    <p>Scan the code on the withdrawal page of<br/>
                        the trading platform APP or wallet APP</p>
                  </div>
                  <div class="barcode-detail">
                    <ul class="row">
                      <li class="col-md-12"> 
                        <b>Address</b>
                        <p>12HSARkd7Q4xt5XWBpbUns1SQvHtSRyyzx</p>
                        <i class="ri-file-copy-line"></i>
                      </li>
                      <li class="col-md-6"> 
                        <b>MInimum Deposit</b>
                        <p>0.00000001 BTC</p>
                      </li>    
                      <li class="col-md-6"> 
                        <b>Average Arrival Time</b>
                        <p>0.00000001 BTC</p>
                      </li>   
                      <li class="col-md-6"> 
                        <b>Expected arrival</b>
                        <p>1 network confirmations</p>
                      </li>  
                      <li class="col-md-6"> 
                        <b>Expected Unlock</b>
                        <p>1 network confirmations</p>
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
import DefaultLayout from '../layout/DefaultLayout.vue'
import SelectCoin from '../components/SecurityPage/SelectCoin.vue'

export default {
    name:'security',
    components: { 
      DefaultLayout,
      SelectCoin
    },
    data() {
      return {
      }
    }    
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/wallet/wallet";
h4{
      color: #fff;
    /* font-family: Rubik; */
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
}
</style>