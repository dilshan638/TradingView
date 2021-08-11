<template>
  <default-layout>
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Orders</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body no-padding no-padding-all table-tab">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Open Orders</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Order History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">My Trade History</a>
                            </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div class="row">
                                    <div class="col-md-12">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Pair</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Side</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Field</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Trigger Conditions</th>
                                            </tr>
                                        </thead>
                                        <tbody>                            
                                        </tbody>
                                    </table>                         
                                    </div>
                                </div>                                
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">2</div>
                            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">3</div>
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
// import OpenOrders from '../components/Orders/OpenOrders.vue'

export default {
    name:'order',
    components: { 
      DefaultLayout,
    //   OpenOrders
    },
    data() {
      return {
      }
    }    
}
</script>

<style>

</style>