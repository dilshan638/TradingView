<template>
    <div class="row">
        <div class="col-md-12">
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
            <tbody  v-if="tradeHistory.length !=0">   
                <tr v-for="trdhistory in tradeHistory" :key="trdhistory.created_at">
                <td>One</td>
                <td>One</td>
                 <td>One</td>
                <td>One</td>
                 <td>One</td>
                <td>One</td>
                 <td>One</td>
                <td>One</td>
                 <td>One</td>
              </tr>                         
            </tbody>

              <tbody v-else>   
                <tr >
                <td colspan="9" align="center">No Data Available</td>
              </tr>                         
            </tbody>
        </table>                         
        </div>
    </div>  
</template>

<script>

export default {
    name: 'orderhistory',
    components: {
    },
    data(){
        return{
            tradeHistory:[]
        }
    },

    methods:{
         async geTradeHistory() {
      var data = {
        limit: "60",
        offset: 1,
        search: "",
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/mobile/v1/history/trade",

        data,
        hed
      );

      this.tradeHistory = response.data;
      console.log(this.tradeHistory);
    },
    },

    mounted() {
    this.geTradeHistory();
   

  },
}
</script>

<style>

</style>