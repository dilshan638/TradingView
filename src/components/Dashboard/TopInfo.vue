<template>
  <div class="top-info">
      <div class="profile-img">
        <img :src="images.url" />
      </div>
      <div class="pro-detail">
          <div class="info1"><strong>{{ this.emailmask }}</strong> <span class="badge bg-primary">Personal</span></div>
          <span class="userid">User ID: 4234235523</span>
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
            emailmask:''
        }
    },
    methods: {
        getimage() {
            this.images.url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg";
        },
        getUserData() {
            console.log("test");
            this.emailmask = localStorage.getItem("emailmask")
        }
    },
    created() {
        this.getimage();
    },
    mounted() {
        this.getUserData();
    }
}    
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/Dashboard/Dashboard';
</style>
