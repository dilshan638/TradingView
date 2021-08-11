<template>
<div class="card">
    <div class="card-header">
        <div class="row">
            <div class="col-md-3">
                <h2>Wallet Balances</h2>
            </div>
            <div class="col-md-9 text-right">
                <router-link to="/securitypage"><button type="button" class="btn btn-primary btn-sm btn-outline active">Deposit</button></router-link>
                <button type="button" class="btn btn-primary btn-sm btn-outline">Withrow</button>
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6">
            <div class="block">
                <p>Account Balance</p>
                <h4>0.37,434.74 <span>BTC</span></h4>
            </div>
            <div class="block">
                <p>Estimated Value</p>
                <h4>$35,607,434.74</h4>
            </div>                          
            </div>
            <div class="col-md-6">
                <apexchart width="350" :options="chartOptions" :series="series"></apexchart>
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
            depositTab: true,
            withrowTab: false,
            series: [44, 55, 41, 17],
            chartOptions: {
                labels: ["LDXI", "BTC", "ETH", "HNT"],
                chart: {
                    type: 'donut',
                },
                 stroke:{
                     show: false
                },
                legend: {
                    labels: {
                        colors: '#878787',
                        useSeriesColors: false
                    },
                    markers: {
                        width: 17,
                        height: 17,
                        strokeWidth: 0,
                        strokeColor: '#fff',
                        fillColors: undefined,
                        radius: 3,
                        customHTML: undefined,
                        onClick: undefined,
                        offsetX: -10,
                        offsetY: 4
                    },
                    itemMargin: {
                        horizontal: 0,
                        vertical: 8
                    }                                 
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 80
                        },
                        legend: {
                        position: 'bottom'
                        }
                    }
                }]
            }      
        }
    },
    methods:{
        showDeposit() {
            this.depositTab = true;
            this.withrowTab = false;
        },
         showWithrow() {
            this.withrowTab = true;
            this.depositTab = false;
        },       
    }
}
</script>

<style>

</style>