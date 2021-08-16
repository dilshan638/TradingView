<template>
<div class="header-area">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
            <a class="navbar-brand" href="#">
              <img src="images/logo/logo.png" />
            </a>
      </div>
      <div class="col-md-7">
        <nav class="navbar navbar-expand-lg">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
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
        <button class="btn btn-outline-success my-2 my-sm-0">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'header',
  data(){
      return{

      }
  }

}
</script>

<style lang="scss" scoped>
  @import "Header.scss"
</style>