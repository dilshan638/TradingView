<template>
    <div class="trade-box">
        <div class="row status1">
        <div class="col-md-4 pos-rel">
                    <div class="search-head" @click="dropdownshow = !dropdownshow">
                        <h4>Markets</h4>
                        <i class="ri-arrow-down-s-line" :class="[dropdownshow ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']"></i>
                    </div>
                    <div class="search-body buysell-form" v-if="dropdownshow">
                        <input class="form-control" placeholder="search" />
                                        <div class="trade-body coins-body bottom-table">
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
        </div>
        <div class="col-md-2">
            <h4>32,545.50</h4>
            <span class="sub-bottom">$35,988.54</span>
        </div>
        <div class="col-md-6">
            <div class="top-sub">
                <h3>24h Change</h3>
                <b>0.11323</b>
            </div>
            <div class="top-sub">
                <h3>24h Change</h3>
                <b>0.11323</b>
            </div> 
            <div class="top-sub">
                <h3>24h Change</h3>
                <b>0.11323</b>
            </div>  
            <div class="top-sub">
                <h3>24h Change</h3>
                <b>0.11323</b>
            </div>    
            <div class="top-sub">
                <h3>24h Change</h3>
                <b>1,433,454,545.87</b>
            </div>
            <div class="top-sub">
                <h3>MA(7)</h3>
                <b>434234.43</b>
            </div>
            <div class="top-sub">
                <h3>MA(25)</h3>
                <b>434234.43</b>
            </div>   
            <div class="top-sub">
                <h3>MA(99)</h3>
                <b>434234.43</b>
            </div>                       
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'topstatus',
    data() {
        return{
            dropdownshow: false
        }
    }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>