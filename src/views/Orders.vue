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
                <div class="card-body no-padding no-padding-all">
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
                    <div class="row">
                        <div class="col-md-12">
                            <a class="view-more">View More</a>
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