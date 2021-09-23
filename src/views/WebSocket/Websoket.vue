<template>
  <div>
<h2>Vue.js WebSocket Tutorial</h2> 
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
name:"Websoket",
data: function() {
    return {
      connection: null,
       ws:null,
           type:"subscribe",
           product_ids:["BTC-USDT"],
           currency_ids:[],
           channels:["ticker", "match", "level2","funds","order"],
           token:"eyJraWQiOiJGczZSZDR2TkpwZW9xT0czbXRTeEZ6NnlucWlNbEZiVDB0ZGZWeFZ0VVFNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlZWU5MDk1Mi05YThlLTRlM2QtYTRiZi00ZjUxNWEyYjUwMzEiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0yX2M2MjRiMmYyLTljZTMtNDQ4My04OTJlLTYzMTViYTBlYjdjNyIsImV2ZW50X2lkIjoiMDVmMmM4ZmItNGE2OS00MmRkLWJlZjAtMTczNmZkNDAzN2YxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTYzMjE5MjQyOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfZmdXb0traDhqIiwiZXhwIjoxNjMyMjc4ODI4LCJpYXQiOjE2MzIxOTI0MjgsImp0aSI6ImU1YTZjZThiLTczMjItNGYzMS1hMzA5LWNlNmU3NzkyODg5MyIsImNsaWVudF9pZCI6InE5bmFzbnUxMmtkNGpqMHRkYzliOGFwajEiLCJ1c2VybmFtZSI6ImNoYXJpdGhAcGVyc3lzdGFuY2UuY29tIn0.pUuWnIDmDsCcDKi11I_FRZo6DF5hNGchjdPMFvfcAMTyquMcLHoLZu0gTnUrICD9akFuSm-zvxLxUeBgpiJtAVjK_HKufQh1vdLDrzXNnmiBGcUp4wR3LBn-Yz1wJuNlAMGHTb2Q4yGzDEqDmUvOdiiXh4UGvfVkY0RYMqepliaNcKJ_X6tyjUpgmFlKPKXumytGuO7WVQjZtAdjf_OVPiG67-Run76GEbLRqQGBG28OiPe-U27cdP3Q07XV6dGBlfT1twPX2vbOmuPx6IQuE7ye2mjw4ldlX_Br2P5uoHGEf_C1ajCW-hNgWtElS3PUXISlvTF8KJrVUuCNepzL1w"
    }
  },
   methods: {

   

  async  sendMessage(){

 
      try{
       console.log(this.connection);
       this.connection.send(JSON.stringify({
                 "type":"subscribe",
                 "product_ids":["BTC-USDT"],
                 "currency_ids":[],
                 "channels":["ticker", "match", "level2","funds","order"],
                 "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYXJha2FAZ21haWwuY29tIiwiZXhwaXJlZEF0IjoxNjMyMTU4MDQ5LCJpZCI6NDEsInBhc3N3b3JkSGFzaCI6ImFlMDA1Y2ViN2U5YTIxN2NjZWQyZjhhYTM1NDE4N2M3In0.6KW--OvqAjUbVNP6r0b4avksK0R6MBi_FzmYtptDknQ"
                  }));

      }catch(error){

        console.log(error)
      }
    },
  async loadData(){
       this.connection = new WebSocket("ws://dc54-2402-4000-2281-830-2571-4be4-dc0b-917f.ngrok.io/ws")
        this.connection.onmessage = function(event) {
        console.log(JSON.parse(event.data));
      
      
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

     
     
    }
    },
 mounted(){
   this.sendMessage()
    
    },


 // created: function() {
    // console.log("Starting connection to WebSocket Server")
    // this.connection = new WebSocket("ws://dc54-2402-4000-2281-830-2571-4be4-dc0b-917f.ngrok.io/ws")

    // this.connection.onmessage = function(event) {
    //   console.log(JSON.parse(event.data));
      
      
    // }

    // this.connection.onopen = function(event) {
    //   console.log(event)
    //   console.log("Successfully connected to the echo websocket server...")
    // }

 // },

   created(){
     this.loadData()
   },

  


}
</script>

<style>

</style>