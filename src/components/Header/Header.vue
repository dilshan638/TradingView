<template>
<div class="header-area">
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
            <router-link class="navbar-brand" to="/">
              <img src="images/logo/logo.png" />
            </router-link>
      </div>
      <div class="col-10 col-md-7">
        <nav class="navbar navbar-expand-lg">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            <i class="ri-menu-5-fill"></i>
          </button>          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
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
        <router-link  to="/signin"> <button class="btn btn-outline-success my-2 my-sm-0 mobile-hide" @click="logout">Logout</button></router-link>
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
    return {};
  },

  methods: {
    logout() {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("createdAddress");
      localStorage.removeItem("createdAddressSelectList");
      localStorage.removeItem("arraySymbol");
      localStorage.removeItem("bindArray");
      localStorage.removeItem("AddressListArray");
      localStorage.removeItem("selectedCoin");

      localStorage.removeItem("minimum_deposite");
      localStorage.removeItem("avarege_arrival_time");
      localStorage.removeItem("expected_arrival");
      localStorage.removeItem("expected_unlock");
      
       localStorage.removeItem("selectedCoinWithdraw");
       localStorage.removeItem("totalBalances");
       localStorage.removeItem("emailmask");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Header.scss";
</style>