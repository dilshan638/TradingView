<template>
  <div class="main-layout">
    <div class="col-md-12">
      <div class="container-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="row" style="margin-top: 15px;">
                <div class="col-md-12 no-padding">
                  <div class="content">
                    <slot/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'pageContent',
  data(){
      return{

      }
  }
}
</script>
<style>
    @import "../../assets/scss/pagecontent/pagecontent.scss";
</style>