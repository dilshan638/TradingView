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
        async  getimage() {
            this.images.url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg";
        },
        async  getUserData() {
            console.log("test");
            this.emailmask = localStorage.getItem("emailmask")
        },
        async getInspiraId() {
            this.inspiraId = localStorage.getItem("inspiraId")
            console.log(this.inspiraId)
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
