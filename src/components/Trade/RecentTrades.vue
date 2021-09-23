<template>
    <div class="trade-box">
        <div class="trade-header">
            Recent Trades 
        </div>
        <div class="trade-body">
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Price(USDT)</th>
                <th scope="col">Amount(LDXI)</th>
                <th scope="col" class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
               
                <tr class="plus" v-for="recent in recentData" :key="recent">
                    <td  v-bind:class="[ recent.slide=='buy'? 'buy' : 'sell']">{{ recent.price}}</td>
                    <td >{{ recent.size}}</td>
                    <td class="text-right" >{{ recent.price *  recent.size}}</td>
                </tr>
             </tbody>
            </table>            
        </div>
    </div>
</template>

<script>
export default {
    name:'recenttrades',

    data(){
        return{
               recentData:[],
                priceBuy:[],
                dataAl:[],

                recentDataLoop:[],
                fill:"",
               


        }
    },

    methods: {
   async  sendMessage() {
        
      try {
       
         this.connection.send(JSON.stringify({

        "type":"subscribe",
         "product_ids":["BTC-USDT"],
         "currency_ids":[],
         "channels": [ "order" ] 
         
         }));

      } catch (error) {
        console.log(error);
      }  
     
    },

    async setData(dataBuyArray){
     
      this.recentData=dataBuyArray
     // console.log(this.priceBuyBind)
   
    
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
      
      console.log(JSON.parse(event.data).type);
      ts.dataAl=JSON.parse(event.data)
     
      // ts.priceBuy=ts.dataAl

        if( ts.dataAl.type=='order'){
              for(let t = 0; t <1; t++){
                  
                 ts.recentDataLoop.push(ts.dataAl)

                 }
        }


        if( ts.dataAl.type=='order' && ts.dataAl.status=='filled'){
         

             for(let a = 0; a <1; a++){
                  
                 ts.fill=ts.dataAl.price

                 }
      }
      
     ts.setData(ts.recentDataLoop)
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
  @import "../../assets/scss/Trade/Trade";

  .buy{
    color: red;
  }
  .sell{
    color: green;
  }
</style>