<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <WalletBalance/>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <wallet-list-table/>
        </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'
import WalletBalance from '../components/Wallet/WalletBalance.vue'
import WalletListTable from '../components/Wallet/WalletListTable.vue'

export default {
    name:'wallet',
    components: { 
      DefaultLayout,
      WalletBalance,
      WalletListTable
    },
    data() {
      return {
      }
    }    
}
</script>

<style>

</style>