<template>
  <default-layout>
    <div class="row">
      <div class="col-xl-12 no-padding">
          <TopInfo />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-8">
          <WalletBalance />
          <Login-history />
      </div>
      <div class="col-xl-4 no-padding-left">
          <Announcements />
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'
import WalletBalance from '../components/Dashboard/WalletBalance.vue'
import Announcements from '../components/Dashboard/Announcements.vue'
import LoginHistory from '../components/Dashboard/LoginHistory.vue'
import TopInfo from '../components/Dashboard/TopInfo.vue'

export default {
    name:'dashboard',
    components: { 
      DefaultLayout,
      WalletBalance,
      Announcements,
      LoginHistory,
      TopInfo
    },
    data() {
      return {
        dashboardpage: true,
      }
    }    
}
</script>

<style>
</style>