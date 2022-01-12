<template>
    <div class="container market-area">
        <div class="row">
            <div class="col-md-9">
                <h2>Market</h2>
            </div>
            <div class="col-md-3">
                <div class="search-form">
                    <input type="text" class="form-control" placeholder="Search by Coin Name" v-model="searchcoin" />
                </div>
            </div>
        </div>    
        <div class="row">
            <div class="col-md-12">
                <div class="card market-card">
                    <div class="card-body no-padding no-padding-all table-tab">
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Spot Market</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Favourites</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">     
                                        <div class="row">
                                            <div class="col-md-12">
                                                <table class="table table-hover" style="margin-bottom: 60px;">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Pair</th>
                                                            <th scope="col">Last Price</th>
                                                            <th scope="col">24h High</th>
                                                            <th scope="col">24h Change</th>
                                                            <th scope="col">24h Low</th>
                                                            <th scope="col">Market Cap</th>
                                                            <th scope="col">24h Volume</th>
                                                            <th scope="col">Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="marketprice in filtercoin" :key="marketprice.coin">
                                                            <td scope="col">{{ marketprice.pair_name }}</td>
                                                            <td scope="col">{{ marketprice.last_price }}</td>
                                                            <td scope="col">-</td>
                                                            <td scope="col">{{ marketprice.change }}</td>
                                                            <td scope="col">-</td>
                                                            <td scope="col">-</td>
                                                            <td scope="col">{{ marketprice.volume }}</td>
                                                            <td scope="col">Edit</td>
                                                        </tr>                                                        
                                                    </tbody>
                                                </table>                                                
                                            </div>
                                            <div class="col-md-12" v-if="AltsMarketTabShow">2</div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        2
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
import axios from 'axios';
export default {
    data(){
        return{
            BtcMarketTabShow: true,
            AltsMarketTabShow: false,
            searchcoin: '',
            coindata: []
        }
    },
    methods: {
        showBtcMarketTabShow() {
            this.BtcMarketTabShow = true;
            this.AltsMarketTabShow = false
        },
        showAltsMarketTabShow() {
            this.BtcMarketTabShow = false;
            this.AltsMarketTabShow = true
        },
        async coinDetails() {
        axios.get("https://dapi.exus.live/api/mobile/v1/common/marcket/trade/pair")
            .then((res) => {
            this.coindata =  res.data[0];
            console.log(this.coindata); 

            for (let i = 0; i < this.coindata.length; i++) {
                this.coin = this.coindata[i].pair_name.toLowerCase();
                this.lastprice = this.coindata[i].price;
                this.priceChanege = this.coindata[i].change_24h;
            }
        })
            .catch(function (error) {
            console.log(error);
            })
        },
    },
    mounted() {
        this.coinDetails();
    },
    computed: {
        filtercoin: function() {
            return this.coindata.filter((marketprice) => {
                return marketprice.pair_name.toLowerCase().includes(this.searchcoin.toLowerCase())
            })
        }
    },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Market/Market";
</style>