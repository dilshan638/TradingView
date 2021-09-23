<template>
  <div class="trade-box">
   
    <div class="trade-header">
      Order Book
      <div class="sw-b"></div>
      <div class="sw-b"></div>
      <div class="sw-b active"></div>
    </div>
    <div class="trade-body tbl">
      <table class="table table-hover">
        <thead>
          <tr >
            <th scope="col">Price(USDT)</th>
            <th scope="col">Amount(LDXI)</th>
            <th scope="col" class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
         

         
          <tr v-for="sell in priceSellBind" :key="sell" >
            <td > {{ sell[0]}}</td>
            <td>{{ sell[1]}}</td>
            <td class="text-right">{{ sell[0] * sell[1]}}</td>
          </tr>


         
         
        </tbody>
      </table>
    </div>
    <div class="read-more " >
     <a class="link " href="/trade/buy-sell-list">View more</a>
     
    </div>
    
  </div>
</template>

<script>
export default {
  name: "orderbook",
  data(){
        return {
            connection:null,
            priceSell:[],
            priceBuy:[],
          
            dataAl:[],

            priceSellBind:[],
            priceBuyBind:[],

            priceBool:false,
            
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
                //"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyMTU4MDQ5LCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.6KW--OvqAjUbVNP6r0b4avksK0R6MBi_FzmYtptDknQ"
                  
                  
                  }));
      } catch (error) {
        console.log(error);
      }  
     
    },

    async setData(dataSellArray){
      this.priceSellBind=dataSellArray

        
     
    }
  },
  mounted() {
    this.setData()
  },
  created: function () {
   const ts = this
    this.connection = new WebSocket(
       "ws://bebd-2402-4000-2182-4fac-f197-2d83-22be-2d.ngrok.io/ws"
    );

    this.connection.onmessage = function (event) {
      
      console.log(JSON.parse(event.data));
      ts.dataAl=JSON.parse(event.data)
      ts.priceSell=ts.dataAl.asks
     


      ts.setData( ts.priceSell)
    
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
       ts.sendMessage()
      
    
  };
    

     

    

    
  },

};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Trade/Trade";

.tbl{
  max-height: 400px;
    overflow-y: hidden;
}

.read-more{
  padding: 15px;
  float: left;
  width: 100%;
  text-align: right;
  a{
    color: white;
    text-decoration: underline;
  }

}


</style>