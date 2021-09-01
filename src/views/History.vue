<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card new-table">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>History</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body no-padding no-padding-all table-tab">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Withdraw History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Deposit History</a>
                            </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">     
                                    <history />
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                   Coming Soon
                                </div>
                                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                   Coming Soon
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
import History from '../components/History/History.vue'

export default {
    name:'order',
    components: { 
        DefaultLayout,
        History
    },
    data() {
      return {
      }
    }    
}
</script>

<style>

</style>