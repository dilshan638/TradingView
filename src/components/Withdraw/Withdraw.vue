<template>
  <div class="card table-card custom-card">
      <div class="row">
          <div class="col-md-12">
              <h3 >Withdrawal Details</h3>
          </div>
      </div>
      <div class="row">
          <div class="col-lg-7">
            <div class="withdraw-details">
                <ul>

                  <li>
                    <b>Status</b>
                    <p>Processing : confirmation 0/1</p>
                  </li>

                  <li>
                    <b>Date</b>
                    <p>2021-06-21 11:11</p>
                  </li>

                  <li>
                    <b>Coin</b>
                    <p>BTC - BITCOIN</p>
                  </li>   

                  <li>
                    <b>Withdraw Amount</b>
                    <p>8000</p>
                  </li>

                  <li>
                    <b>Network Fee</b>
                    <p>0</p>
                  </li>    

                  <li>
                    <b>Network</b>
                    <p>BTC - Bitcoin</p>
                  </li>     

                  <li>
                    <b>Address</b>
                    <p>34KMALZ4jH6MLMmsufcVk5NFg4SYU97NnZ <i class="ri-file-copy-line"></i></p>
                  </li>

                  <li>
                    <b>Note</b>
                    <p>667774543533 <i class="ri-file-copy-line"></i></p>
                  </li>                                                                  

                </ul>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="withdraw-timeline">
                <div class="timeline-right">
                    <ul>
                      <li class="complete">
                          <div class="dot"></div>
                          <div class="line"></div>
                          <b>Withdrawal order submitted</b>
                          <p>2021-06-21 11:11</p>
                      </li>
                      <li class="complete">
                          <div class="dot"></div>
                          <div class="line"></div>
                          <b>System Processing</b>
                          <p>2021-06-21 11:11</p>
                      </li>
                      <li>
                          <div class="dot"></div>
                          <b>Estimated withdrawal successful</b>
                          <p>2021-06-21 11:11 (Estimated)</p>
                      </li>
                    </ul>
                </div>
            </div>
          </div>          
      </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/Withdraw/Withdraw";
</style>