<template>
<div class="header-area">
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
            <router-link class="navbar-brand" to="/">
              <img v-if="showmenu" src="images/logo/logo.png" />
              <img v-else src="images/logo/sm-logo.png" />
            </router-link>
            <div class="menu-col">
              <i class="ri-menu-fold-line" v-if="showmenu" @click="menuhide"></i>
              <i class="ri-menu-unfold-line" v-else @click="menushow"></i>
            </div>
      </div>
      <div class="col-10 col-md-7">
        <nav class="navbar navbar-expand-lg mobile-hide">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            <i class="ri-more-fill"></i>
          </button>          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item desktop-hide" v-if="alareadylogin">
                <router-link class="nav-link" to="/signin" @click="logout">Logout</router-link>
              </li> 
              <li class="nav-item desktop-hide" v-else>
                <router-link class="nav-link" to="/signin">Login</router-link>
              </li>               
              <li class="nav-item">
                <a class="nav-link" href="#">Buy LDXI</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/market">Markets</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/trade">Trade</router-link>
              </li>  
              <li class="nav-item">
                <a class="nav-link" href="#">Learn</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="col-md-3" style="text-align:right">
        <button class="btn btn-outline-success my-2 my-sm-0 mobile-hide" v-if="alareadylogin" @click="logout">Logout</button>
        <router-link v-else  to="/signin"> <button class="btn btn-outline-success my-2 my-sm-0 mobile-hide">Login</button></router-link>
      </div>
    </div>
  </div>
</div> 
</template>

<script>
export default {
  watch: {
  },
  name: "header",
  data() {
    return {
      alareadylogin: false,
     
      inspira_2fa_status:"",
      showmenu: true
    };
  },

  methods: {
    logout() {
        window.localStorage.clear();
        this.$router.push("/signin");
        this.$toast.show("Successfully Logged out. Thank you!", {type: "success", position: "top"});
    },
    menuhide() {
      this.showmenu  = false;
      document.querySelector("body").classList.add("hidesidemenu");
    },
    menushow() {
      this.showmenu = true;
      document.querySelector("body").classList.remove("hidesidemenu");
    },
    checklogin() {
      this.inspira_2fa_status= localStorage.getItem('inspira_2fa_status' )
      if(localStorage.getItem("X-LDX-Inspira-Access-Token")!=null){
          this.alareadylogin = true;
      }
      else{
        this.alareadylogin = false
      }
    }
  },
  mounted() {
    this.checklogin();
  }
};
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Header/Header";
</style>