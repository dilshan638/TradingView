<template>
<div class="footer-area">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-3">
            <ul class="list-group">
              <li class="list-group-item title">About</li>
              <li class="list-group-item">About us</li>
              <li class="list-group-item">The Team</li>
              <li class="list-group-item">Careers</li>
            </ul>             
          </div>
          <div class="col-md-3">
            <ul class="list-group">
              <li class="list-group-item title">Services</li>
              <li class="list-group-item">BUy LDXI</li>
              <li class="list-group-item">Downloads</li>
            </ul>             
          </div>
          <div class="col-md-6"></div>
        </div>       
      </div>
      <div class="col-md-4 text-center footer-center">
        <img src="images/logo/logo.png" />
        <p>
          1 Poultry, EC2R 8EJ, London,<br/>
            United Kingdom
          </p>    
          <p><span>+44 (0)101 0000 888</span> <span>info@ldcx.com</span></p>     
      </div>
      <div class="col-md-4 text-right social-logo">   
        <a href=""><i class="ri-facebook-fill"></i></a>
        <a href=""><i class="ri-twitter-fill"></i></a>
        <a href=""><i class="ri-instagram-line"></i></a>
      </div>
    </div>
  </div>
</div> 
</template>
<script>
export default {
  name:'footer',
  data(){
      return{

      }
  }

}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Footer/Footer";
</style>