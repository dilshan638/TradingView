<template>
 
    <div class="row">
      <div class="col-md-6">
           <div class="trade-box ">
        <div class="trade-header">
            Recent Trades 
        </div>
        <div class="trade-body">

            <div class="table-responsive">
                    <table class="table table-hover tbl">
            <thead>
                <tr>
                <th scope="col">Price(USDT)</th>
                <th scope="col">Amount(LDXI)</th>
                <th scope="col" class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
               
                <tr class="plus" v-for="buy in priceBuyBind" :key="buy">
                    <td>{{ buy[0]}}</td>
                    <td>{{ buy[1]}}</td>
                    <td class="text-right">{{ buy[0] * buy[1]}}</td>
                </tr>
             </tbody>
            </table>   
            </div>

                     
        </div>
    </div>
      </div>

       <div class="col-md-6">
           <div class="trade-box ">
        <div class="trade-header">
            Recent Trades 
        </div>
        <div class="trade-body">

            <div class="table-responsive">
                    <table class="table table-hover tbl">
            <thead>
                <tr>
                <th scope="col">Price(USDT)</th>
                <th scope="col">Amount(LDXI)</th>
                <th scope="col" class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
               
                <tr class="plus" v-for="buy in priceBuyBind" :key="buy">
                    <td>{{ buy[0]}}</td>
                    <td>{{ buy[1]}}</td>
                    <td class="text-right">{{ buy[0] * buy[1]}}</td>
                </tr>
             </tbody>
            </table>   
            </div>

                     
        </div>
    </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'BuyAndSellList',

    data(){
        return{
               priceBuyBind:[],
                priceBuy:[],
                dataAl:[]
        }
    },

    methods: {
   async  sendMessage() {

       
        
      try {
       
         this.connection.send(JSON.stringify({
                 "type":"subscribe",
                 "product_ids":["BTC-USDT"],
                 "currency_ids":[],
                 "channels":["ticker", "match", "level2","funds","order"],
                 "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyMTU4MDQ5LCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.6KW--OvqAjUbVNP6r0b4avksK0R6MBi_FzmYtptDknQ"
                  }));
      } catch (error) {
        console.log(error);
      }  
     
    },

    async setData(dataBuyArray){
     
      this.priceBuyBind=dataBuyArray
      console.log(this.priceBuyBind)
    
    }
  },
  mounted() {
    
 
    this.setData()
  },
  created: function () {
   const ts = this
    this.connection = new WebSocket(
      "ws://d5ad-2402-4000-2281-830-f8bb-4e59-5800-214c.ngrok.io/ws"
    );

    this.connection.onmessage = function (event) {
      
      console.log(JSON.parse(event.data));
      ts.dataAl=JSON.parse(event.data)
     
       ts.priceBuy=ts.dataAl.bids


      ts.setData(ts.priceBuy)
      console.log( ts.priceBuy)
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
       ts.sendMessage()
      
    
  };
  },

}
</script>


<style lang="scss" scoped>
.tbl{
    width: 100%
}
  @import "../../assets/scss/Trade/Trade";
</style>