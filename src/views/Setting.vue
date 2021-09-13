<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card new-table">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Settings</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body table-tab tab-body">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Basic Info</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Change Password</a>
                            </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">     
                                    <basic-info />
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <change-password />
                                </div>
                            </div>                      
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
import ChangePassword from '../components/Setting/ChangePassword.vue'
import BasicInfo from '../components/Setting/BasicInfo.vue'


export default {
    name:'order',
    components: { 
        DefaultLayout,
        ChangePassword,
        BasicInfo
    },
    data() {
      return {
      }
    }    
}
</script>

<style>

</style>