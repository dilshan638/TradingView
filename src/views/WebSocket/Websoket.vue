<template>
  <div>
<h2>Tranding WebSocket Test</h2> 
    <button @click="wsSend">Send Message</button>
  </div>
</template>

<script>
export default {
name:"Websoket",
data: function() {
    return {
     // connection: null,
       ws:null,
          type:"subscribe",
           product_ids:["BTC-USDT"],
           currency_ids:[],
           channels:["ticker", "match", "level2","funds","order"],
           token:"eyJraWQiOiJGczZSZDR2TkpwZW9xT0czbXRTeEZ6NnlucWlNbEZiVDB0ZGZWeFZ0VVFNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlZWU5MDk1Mi05YThlLTRlM2QtYTRiZi00ZjUxNWEyYjUwMzEiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0yX2M2MjRiMmYyLTljZTMtNDQ4My04OTJlLTYzMTViYTBlYjdjNyIsImV2ZW50X2lkIjoiMDVmMmM4ZmItNGE2OS00MmRkLWJlZjAtMTczNmZkNDAzN2YxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTYzMjE5MjQyOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfZmdXb0traDhqIiwiZXhwIjoxNjMyMjc4ODI4LCJpYXQiOjE2MzIxOTI0MjgsImp0aSI6ImU1YTZjZThiLTczMjItNGYzMS1hMzA5LWNlNmU3NzkyODg5MyIsImNsaWVudF9pZCI6InE5bmFzbnUxMmtkNGpqMHRkYzliOGFwajEiLCJ1c2VybmFtZSI6ImNoYXJpdGhAcGVyc3lzdGFuY2UuY29tIn0.pUuWnIDmDsCcDKi11I_FRZo6DF5hNGchjdPMFvfcAMTyquMcLHoLZu0gTnUrICD9akFuSm-zvxLxUeBgpiJtAVjK_HKufQh1vdLDrzXNnmiBGcUp4wR3LBn-Yz1wJuNlAMGHTb2Q4yGzDEqDmUvOdiiXh4UGvfVkY0RYMqepliaNcKJ_X6tyjUpgmFlKPKXumytGuO7WVQjZtAdjf_OVPiG67-Run76GEbLRqQGBG28OiPe-U27cdP3Q07XV6dGBlfT1twPX2vbOmuPx6IQuE7ye2mjw4ldlX_Br2P5uoHGEf_C1ajCW-hNgWtElS3PUXISlvTF8KJrVUuCNepzL1w"
    }
  },
   methods: {
    sendMessage: function() {
      console.log(this.ws);
      this.ws.send(JSON.stringify({
                type:this.type,
                product_ids:this.product_ids,
                currency_ids:this.currency_ids,
                channels:this.channels,
                token:this.token
            }))
    },

     handleRecv:function(data) {
            var jsonData = JSON.parse(data)
            this.message_list.unshift(jsonData.data)
           
        },
        wsOpen: function () {
            var that = this
            var ws = new WebSocket("ws://dc54-2402-4000-2281-830-2571-4be4-dc0b-917f.ngrok.io/ws")

            ws.onopen = function () {
                console.info("ws open")
            }

            ws.onmessage = function (evt) {
               
                that.handleRecv(evt.data)
                
            }

            ws.onclose  = function () {
                console.info("ws close")
            }

            this.ws = ws
        },
        wsSend: function() {
         
            if(this.ws == null) {
                console.info ("connection has not been opened")
            }

            this.ws.send(JSON.stringify({
                type:this.type,
                product_ids:this.product_ids,
                currency_ids:this.currency_ids,
                channels:this.channels,
                token:this.token
            }))
        }
  },
 mounted(){
        this.wsOpen();
    }
  // created: function() {
  //   console.log("Starting connection to WebSocket Server")
  //   this.connection = new WebSocket("ws://25b4-2402-4000-2281-830-2571-4be4-dc0b-917f.ngrok.io/ws", { protocol: this.protocols } )

  //   this.connection.onmessage = function(event) {
  //     console.log(event);
  //   }

  //   this.connection.onopen = function(event) {
  //     console.log(event)
  //     console.log("Successfully connected to the echo websocket server...")
  //   }

  // }
}
</script>

<style>

</style>