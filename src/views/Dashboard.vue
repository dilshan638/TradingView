<template>
  <default-layout>
    <div class="row">
      <div class="col-md-8">
          <WalletBalance/>
      </div>
      <div class="col-md-4">
          <Announcements/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
          <Login-history/>
      </div>
      <div class="col-md-4">                 
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'
import WalletBalance from '../components/Dashboard/WalletBalance.vue'
import Announcements from '../components/Dashboard/Announcements.vue'
import LoginHistory from '../components/Dashboard/LoginHistory.vue'

export default {
    name:'dashboard',
    components: { 
      DefaultLayout,
      WalletBalance,
      Announcements,
      LoginHistory
    },
    data() {
      return {
      }
    }    
}
</script>

<style>
</style>