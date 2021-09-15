<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card new-table">
                <div class="card-body table-tab tab-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <h3 class="setting-title">Your Profile</h3>
                            <basic-info />
                        </div>
                        <div class="col-lg-6">
                            <h3 class="setting-title">Security Settings</h3>
                            <SecurityOptions />
                            <h3 class="setting-title">Change Password</h3>
                            <change-password />
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
import BasicInfo from '../components/Setting/BasicInfo.vue'
import SecurityOptions from '../components/Setting/SecurityOptions.vue'
import ChangePassword from '../components/Setting/ChangePassword2.vue'


export default {
    name:'order',
    components: { 
        DefaultLayout,
        BasicInfo,
        SecurityOptions,
        ChangePassword
    },
    data() {
      return {
      }
    }    
}
</script>

<style lang="scss" scoped>
    @import '../assets/scss/Setting/Setting';
</style>