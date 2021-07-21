<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light top-head">
      <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                  <img src="https://cdn.zeplin.io/60dd5628c0672308a271b51d/assets/ccaca1a9-ef72-4ca0-bd1f-860b48e2da49.svg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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

<style>

.top-head{
    background-color: #131313;
    height: 80px;
}

.navTextColor{
    color: aliceblue;
}
</style>