<template>
  <trade-layout>
    <div class="row">
        <div class="col-md-7 no-padding-right">
          <top-status />
        </div>
        <div class="col-md-5">
            <div class="trade-box"></div>
        </div>        
    </div>
  </trade-layout>
</template>

<script>
import TradeLayout from '../layout/TradeLayout.vue'
import TopStatus from '../components/Trade/TopStatus.vue'

export default {
    name:'trade',
    components: { 
      TradeLayout,
      TopStatus
    },
    data() {
      return {
      }
    }    
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/Trade/Trade";
</style>