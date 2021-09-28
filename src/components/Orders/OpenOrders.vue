<template>
    <div class="row">
        <div class="col-md-12">
        <div class="table-responsive">    
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Pair</th>
                        <th scope="col">Type</th>
                        <th scope="col">Side</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Field</th>
                        <th scope="col">Total</th>
                        <th scope="col">Trigger Conditions</th>
                    </tr>
                </thead>
                <tbody>                            
                </tbody>
            </table> 
        </div>                        
        </div>
    </div>  
</template>

<script>
export default {
    name: 'openorder',
    components: {
    },
    data(){
        return{
            dataAl:[]
        }
    },

     methods: {
          async sendMessage() {
      try {
        this.connection.send(
          JSON.stringify({
           type: "subscribe",
            product_ids: ["BTC-USDT"],
            currency_ids: [],
            channels: ["ticker", "match", "level2", "funds", "order"],
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyNzY0MzcyLCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.1cwqK6VfVsHpRUX_3sAOvVgzkeDvvlmqH0C-7up7nJg",
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    // async setData() {   
    // },
     },

      mounted() {
    //this.setData()
    
    },

   
  created: function () {
    const ts = this;
    this.connection = new WebSocket( "ws://34.152.9.147:8002/ws");

    this.connection.onmessage = function (event) {
     ts.dataAl = JSON.parse(event.data);
     console.log(ts.dataAl)
   };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      ts.sendMessage();
    };

    
  },
}
</script>

<style>

</style>
