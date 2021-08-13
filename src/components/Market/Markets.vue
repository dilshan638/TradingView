<template>
    <div class="container market-area">
        <div class="row">
            <div class="col-md-9">
                <h2>Market</h2>
            </div>
            <div class="col-md-3">
                <div class="search-form">
                    <input type="text" class="form-control" placeholder="Search" />
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
                                                <div class="inner-table-area">
                                                    <button class="btn button" v-bind-class="[]" @click="showBtcMarketTabShow">BTC Markets</button>
                                                    <button class="btn button btn-outline" v-bind-class="[]" @click="showAltsMarketTabShow">ALTS Markets</button>                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" v-if="BtcMarketTabShow">1</div>
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
export default {
    data(){
        return{
            BtcMarketTabShow: true,
            AltsMarketTabShow: false
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
        }        
    }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Market/Market";
</style>