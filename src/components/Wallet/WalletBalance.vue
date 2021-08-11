<template>
<div class="card only-card-header">
    <div class="card-header">
        <div class="row">
            <div class="col-md-4">
                <h2>Wallet Balances <span class="eye-point"><i class="ri-eye-line"></i> Hide Balances</span></h2>
                <router-link to="/securitypage"><button type="button" class="btn btn-primary btn-sm btn-outline mt-4 active">Deposit</button></router-link>
                <button type="button" class="btn btn-primary btn-sm mt-4  btn-outline">Withrow</button>                
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <div class="block">
                            <p>Total Balance</p> 
                            <h4>0.37,434.74 <span>BTC</span></h4>
                        </div>                        
                    </div>
                    <div class="col-md-6">
                        <div class="block">
                            <p>Market Value</p>
                            <h4>$ 232.54</h4>
                        </div>                        
                    </div>                     
                </div>
            </div>
        </div>
    </div>                  
</div>
</template>

<script>
export default {
    components: {
    },
    data(){
        return{
        }
    }
}
</script>

<style>

</style>