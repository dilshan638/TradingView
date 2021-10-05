<template>
    <div class="trade-box">
      <!-- trade comoponents -->
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
               
                <!-- <tr  v-for="recent in recentData" :key="recent" >
                    <td v-bind:class="[ recent.side=='buy'? 'buy' : 'sell']" >{{ recent.price}}</td>
                    <td >{{ recent.size}} </td>
                    <td class="text-right" >{{ recent.price *  recent.size}}</td>
                </tr> -->
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
  //  async  sendMessage() {
        
  //     try {
       
  //        this.connection.send(JSON.stringify({

  //       "type":"subscribe",
  //        "product_ids":["BTC-USDT"],
  //        "currency_ids":[],
  //        "channels": [ "order" ] 
         
  //        }));

  //     } catch (error) {
  //       console.log(error);
  //     }  
     
  //   },

  //   async setData(dataBuyArray){
     
  //     this.recentData=dataBuyArray
      
  //     console.log(this.priceBuyBind)
   
    
  //   }
  },
  mounted() {
   // this.setData()
  },


//   created: function () {
//    const ts = this
//    this.connection = new WebSocket( "ws://e9b7-2402-4000-2281-4a16-2ca6-a022-3c15-29e1.ngrok.io/ws");
//     this.connection.onmessage = function (event) {
      
//       console.log(JSON.parse(event.data).type);
//       ts.dataAl=JSON.parse(event.data)
     
//        if( ts.dataAl.type=='order' || ts.dataAl.type=='match'){
//               for(let t = 0; t <1; t++){
                  
//                  ts.recentDataLoop.push(ts.dataAl)

//                  }
//         }


//         if( ts.dataAl.type=='order' && ts.dataAl.status=='filled'){
         

//              for(let a = 0; a <1; a++){
                  
//                  ts.fill=ts.dataAl.price

//                  }
//       }
      
//      ts.setData(ts.recentDataLoop)
//      };

//       this.connection.onopen = function (event) {
//       console.log(event);
//       console.log("Successfully connected to the echo websocket server...");
//        ts.sendMessage()
      
    
//      };

//     //  this.connection.onclose = function(event) {
//     //   console.log("WebSocket is closed now.");
//     //   console.log(event)
//     //   }
  
//  },

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Trade/Trade";

  .buy{
    color: #18e140 !important;
  }
  .sell{
    color:red !important;
  }
</style>