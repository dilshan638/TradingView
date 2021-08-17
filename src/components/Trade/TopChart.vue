<template>
    <div class="trade-box">
        <div class="row status1">
            <div class="row">
                <div class="col-md-4" style="position:relative">
                    <div class="search-head" @click="dropdownshow = !dropdownshow">
                        <h4>Markets</h4>
                        <i class="ri-arrow-down-s-line" :class="[dropdownshow ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
                    </div>
                    <div class="search-body buysell-form" v-if="dropdownshow">
                        <input class="form-control" placeholder="search" />
                        <div class="tab-content sub-tab-area" id="myTabContent2">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <ul class="nav nav-tabs sub-tab" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab2" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true">Limit</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab2" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile2" aria-selected="false">Market</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="contact-tab2" data-toggle="tab" href="#contact2" role="tab" aria-controls="contact2" aria-selected="false">Stop</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="contact-tab3" data-toggle="tab" href="#contact3" role="tab" aria-controls="contact3" aria-selected="false">Stop Limit</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="myTabContent2">
                                    <div class="tab-pane fade show active" id="home2" role="tabpanel" aria-labelledby="home-tab2">
                                        <div class="trade-body coins-body">
                                            <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                <th scope="col" class="no-border-table-th">Coin</th>
                                                <th scope="col" class="no-border-table-th">Last Price</th>
                                                <th scope="col" class="no-border-table-th text-right">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>    
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>
                                                <tr>
                                                    <td><i class="ri-star-fill"></i> LDXI/ETH</td>
                                                    <td>0.22123212</td>
                                                    <td class="text-right success-text">+ 1.32%</td>
                                                </tr>                                                                                                                                                                                            
                                            </tbody>
                                            </table>            
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="profile-tab2">2</div>
                                    <div class="tab-pane fade" id="contact2" role="tabpanel" aria-labelledby="contact-tab2">3</div>
                                    <div class="tab-pane fade" id="contact3" role="tabpanel" aria-labelledby="contact-tab3">4</div>
                                </div>                
                            </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">2</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="chart-stat">
                                <b>05/07/20210</b>
                            </div>
                            <div class="chart-stat">
                                <b>O:</b>
                                <span>31,434</span>
                            </div>
                            <div class="chart-stat">
                                <b>H:</b>
                                <span>32,3232</span>
                            </div>     
                            <div class="chart-stat">
                                <b>L</b>
                                <span>434434</span>
                            </div>        
                            <div class="chart-stat">
                                <b>C</b>
                                <span>0.62%</span>
                            </div>
                            <div class="chart-stat">
                                <b>Change</b>
                                <span>0.62%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>AMPLITUDE</b>
                                <span>1.55%</span>
                            </div>    
                            <div class="chart-stat">
                                <b>MA(7)</b>
                                <span class="pink-color">1.55%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>MA(27)</b>
                                <span class="error-text">1.55%</span>
                            </div> 
                            <div class="chart-stat">
                                <b>AMPLITUDE</b>
                                <span class="light-blue">1.55%</span>
                            </div>                                                                                                                                         
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'topchart',
    data() {
        return{
            dropdownshow: false
        }
    },
    methods: {   
        async dropdowntoggle() {
            console.log("rt");
        }
    },
    mounted() {
    }   

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>