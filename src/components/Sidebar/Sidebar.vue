<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white sidebar">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <router-link to="/dashboard" class="nav-link  text-white">
                   <i class="ri-layout-masonry-line"></i> Dashboard
                </router-link>
            </li>
            <li>
                <router-link to="/wallet" class="nav-link text-white">
                    <i class="ri-wallet-2-line"></i> Wallet
                </router-link>
            </li>
            <li>
                 <router-link to="/orders" class="nav-link text-white">
                    <i class="ri-key-2-line"></i> Orders
                </router-link>
            </li>
            <li>
                <router-link to="/securitysetting" class="nav-link text-white">
                    <i class="ri-shield-line"></i> Security
                 </router-link>
            </li>
            <li>
               <router-link to="/setting" class="nav-link text-white">
                    <i class="ri-settings-2-line"></i> Setting
               </router-link>
            </li>            
            <li>
              <router-link to="/history" class="nav-link text-white">
                    <i class="ri-history-fill"></i> History
              </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
name:'sidebar'
}
</script>

<style lang="scss" scoped>
  @import "Sidebar.scss"
</style>