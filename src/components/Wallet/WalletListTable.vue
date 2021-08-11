<template>
    <div class="card table-card">
        <div class="card-header">
            <div class="row">
                <div class="col-md-9">
                    <h2>Crypto</h2>
                </div>
                <div class="col-md-3">
                    <div class="search-form">
                        <input type="text" class="form-control" placeholder="Search" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                <table class="table table-hover wallet-table">
                    <thead>
                        <tr>
                            <th scope="col">Coin</th>
                            <th scope="col" class="text-right">Total</th>
                            <th scope="col" class="text-right">BTC Values</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src="images/icons/btc@3x.webp" />
                                <h4>
                                    BTC
                                    <span>Bitcoin</span>
                                </h4>       
                            </td>
                            <td class="text-right">0.43434343</td>
                            <td class="text-right">0.43434343</td>
                            <td class="action-td">
                                <a>Deposit</a>
                                <a>Withdraw</a>
                                <a>Trade</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="images/icons/btc@3x.webp" />
                                <h4>
                                    BTC
                                    <span>Bitcoin</span>
                                </h4>       
                            </td>
                            <td class="text-right">0.43434343</td>
                            <td class="text-right">0.43434343</td>
                            <td class="action-td">
                                <a>Deposit</a>
                                <a>Withdraw</a>
                                <a>Trade</a>
                            </td>
                        </tr>   
                        <tr>
                            <td>
                                <img src="images/icons/btc@3x.webp" />
                                <h4>
                                    BTC
                                    <span>Bitcoin</span>
                                </h4>       
                            </td>
                            <td class="text-right">0.43434343</td>
                            <td class="text-right">0.43434343</td>
                            <td class="action-td">
                                <a>Deposit</a>
                                <a>Withdraw</a>
                                <a>Trade</a>
                            </td>
                        </tr>                                            
                    </tbody>
                </table>                         
                </div>
            </div>
        </div>                    
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/wallet/wallet";
</style>