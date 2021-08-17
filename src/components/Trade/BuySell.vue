<template>
    <div class="trade-box buysell-form">
        <div class="trade-header text-center">
            Buy / Sell
        </div>
        <div class="trade-body">
            <ul class="nav nav-tabs main-tab" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link buy-btn active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Buy</a>
                </li>
                <li class="nav-item" style="margin-right: 0 !important;">
                    <a class="nav-link sell-btn" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Sell</a>
                </li>
                <p>Balance 0.00 USD</p>
            </ul>
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
                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Amount</span>
                            </div>
                            <input type="text" class="form-control" aria-label="" value="5456.434">
                            <div class="input-group-append">
                                <span class="input-group-text">BTC</span>
                            </div>
                            </div>  
                            <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Amount</span>
                            </div>
                            <input type="text" class="form-control" aria-label="" value="5456.434">
                            <div class="input-group-append">
                                <span class="input-group-text">BTC</span>
                            </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="bottom-v">
                                        <b>Fee (0.1%) :</b>
                                        <b>0.00</b>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="bottom-v">
                                        <b>Fee (0.1%) :</b>
                                        <b class="success-text">0.00</b>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <button class="btn btn-primary">BUY BTC</button>
                                </div>
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
</template>

<script>
export default {
    name:'orderbook'

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";
</style>