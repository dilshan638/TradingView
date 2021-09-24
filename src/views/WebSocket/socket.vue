
<template>
  <h1>test socket</h1>
  <button @click="sendmessage">Send me</button>
</template>

<script>
export default {
    data() {
        return{
            connection: null
        }
    },
  methods: {
      sendmessage: function(message) {
          console.log(message);
          this.connection.send(message);
      }
  },
  created: function() {

        console.log("starting connection to web server");
        this.connection = new WebSocket("http://6a94-2402-4000-2281-830-f8bb-4e59-5800-214c.ngrok.io")
        console.log("starting connection to web server 2");

        this.connection.onopen = function(event) {
            console.log(event)
        }
        this.connection.onmessage = function(event) {
            console.log(event)
        }
  }

}
</script>

<style>

</style>