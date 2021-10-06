<template>
    <div class="trade-box">
        <!-- trade comoponents -->
    <div class="row">
        <div class="col-md-12">
            <div class="card table-card trades-card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Order History</h2>
                        </div>
                    </div>
                </div>
                <div class="card-body no-padding no-padding-all table-tab trade-history">
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
                                    <open-orders v-if="authUser" />
                                    <div v-else class="authmsg"><router-link to="/signin">Login</router-link> to trade</div>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <order-history v-if="authUser" />
                                    <div v-else class="authmsg"><router-link to="/signin">Login</router-link> to trade</div>
                                </div>
                                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <my-trade-history  :myTradeHistory="myTradeHistory" v-if="authUser" />
                                    <div v-else class="authmsg"><router-link to="/signin">Login</router-link> to trade</div>
                                </div>
                            </div>                      
                        </div>
                    </div>                    
                </div>                    
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import OpenOrders from '../Orders/OpenOrders.vue'
import OrderHistory from '../Orders/OrderHistory.vue'
import MyTradeHistory from '../Orders/MyTradeHistory.vue'

export default {
    name:'orderhistory',

    props:["myTradeHistory"],
    data() {
        return{
            authUser: false
        }
    },
    components: {
        OpenOrders,
        OrderHistory,
        MyTradeHistory
    },
    methods: {   
      async checkAuthUser() {
         this.authUser = false;
          if(localStorage.getItem("X-LDX-Inspira-Access-Token")!=null){
           this.authUser = true;
         }
         else{
          this.authUser = false;
        }        
      }        
    },
    mounted() {
      this.checkAuthUser();
    }   

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>