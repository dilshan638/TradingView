<template>  
  <div class="top-info">
      <div class="profile-img">
        <!-- <img :src="images.url" /> -->
        {{ picture }}
      </div>
      <div class="pro-detail">
          <div class="info1"><strong>{{ emailmask }}</strong> <span class="badge bg-primary">{{ usertype }}</span></div>
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
            picture:"",
            emailmask:"",
            inspiraId:"",
            usertype: ""
        }
    },
    methods: {
        select: function(event) {
           // var targetId = event.currentTarget.id;
            var targeturl = event.currentTarget.data;
            alert(targeturl); // returns 'foo'
        },
        async  getimage() {
            this.picture = localStorage.getItem("picture");
        },
        async  getUserData() {
            console.log("test");
            this.emailmask = localStorage.getItem("emailmask")
        },
        async getInspiraId() {
            this.inspiraId = localStorage.getItem("inspira_id")
        },
        async getUserType() {
            this.usertype = localStorage.getItem("usertype");
        }
    },
    mounted() {
        this.getUserData();
        this.getInspiraId();
        this.getUserType();
        this.getimage();
    }
}    
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/Dashboard/Dashboard';
</style>
