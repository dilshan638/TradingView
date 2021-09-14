<template>
    <div>
    <h2 class="Security-Verification text-center success-head-text">Withdrawal Request Submitted</h2>
    <p class="sm-texture p-child">The receiver will get</p>
    <p class="sm-texture l-child"> {{withdrawAmount-free}} {{balanceSymbol}} (Fee: {{free}}  {{balanceSymbol}})</p>
    <div class="row">
        <div class="col-md-12">
            <div class="card Security-model">
                <div class="card-body Security-model">
                 <div class="row">
                <div class="col-md-3">
                    <p class="Card-ph">Amount</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{withdrawAmount}}  {{selectCoin}} (Network Fee {{free}} {{balanceSymbol}})</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph">Address</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{withdrawAddress}}</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph pb-0">Network</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2 pb-0">{{network}}</p>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props:['selectCoin','withdrawAddress','network','withdrawAmount','free','balanceSymbol']
}
</script>

<style lang="scss" scoped>
  @import "Crypto.scss";
</style>