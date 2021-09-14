<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card new-table">
                <div class="card-body table-tab tab-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <basic-info />
                        </div>
                        <div class="col-lg-6">
                            g
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
// import ChangePassword from '../components/Setting/ChangePassword.vue'
import BasicInfo from '../components/Setting/BasicInfo.vue'


export default {
    name:'order',
    components: { 
        DefaultLayout,
        BasicInfo
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