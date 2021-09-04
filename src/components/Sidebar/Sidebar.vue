<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white sidebar">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <router-link to="/dashboard" class="nav-link  text-white">
                   <i class="ri-layout-masonry-line"></i> <span>Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/wallet" class="nav-link text-white">
                    <i class="ri-wallet-2-line"></i> <span>Wallet</span>
                </router-link>
            </li>
            <li>
                 <router-link to="/orders" class="nav-link text-white">
                    <i class="ri-key-2-line"></i> <span>Orders</span>
                </router-link>
            </li>
            <li>
                <router-link to="/securitysetting" class="nav-link text-white">
                    <i class="ri-shield-line"></i> <span>Security</span>
                 </router-link>
            </li>
            <li>
               <router-link to="/setting" class="nav-link text-white">
                    <i class="ri-settings-2-line"></i> <span>Setting</span>
               </router-link>
            </li>            
            <li>
              <router-link to="/history" class="nav-link text-white">
                    <i class="ri-history-fill"></i> <span>History</span>
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
    @import "../../assets/scss/Sidebar/Sidebar";
</style>