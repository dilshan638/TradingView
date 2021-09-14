<template>
  <default-layout>
        <withdraw/>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'
import Withdraw from '../components/Withdraw/Withdraw.vue'
export default {
    name:'WithdrawDetails',
    components: { 
        DefaultLayout,
        Withdraw
       
       
    }, 

}
</script>

<style>

</style>