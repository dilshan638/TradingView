<template>  
  <div class="top-info">
      <div class="profile-img">
        <img :src="images.url" />
      </div>
      <div class="pro-detail">
          <div class="info1"><strong>{{ emailmask }}</strong> <span class="badge bg-primary">Personal</span></div>
          <span class="userid">User ID: {{ inspiraId }}</span>
      </div>
  </div>
  <!-- <div id="foo 1" data="foo-url" v-on:click="select($event)">test 1</div>
   <div id="foo 2" v-on:click="select($event)">test 2</div>
    <div id="foo 3" v-on:click="select($event)">test 3</div> -->
</template>

<script>
export default {
    data() {
        return{
            images: [
                {
                    url:"",
                }            
            ],
            emailmask:"",
            inspiraId:""
        }
    },
    methods: {
        select: function(event) {
           // var targetId = event.currentTarget.id;
            var targeturl = event.currentTarget.data;
            alert(targeturl); // returns 'foo'
        },
        async  getimage() {
            this.images.url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg";
        },
        async  getUserData() {
            console.log("test");
            this.emailmask = localStorage.getItem("emailmask")
        },
        async getInspiraId() {
            this.inspiraId = localStorage.getItem("inspira_id")
        }
    },
    created() {
        this.getimage();
    },
    mounted() {
        this.getUserData();
        this.getInspiraId();
    }
}    
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/Dashboard/Dashboard';
</style>
