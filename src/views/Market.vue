<template>
  <landing-layout>
    <div class="row">
        <div class="col-md-12">
           <top-market/>
        </div>
    </div>
  </landing-layout>
</template>

<script>
import LandingLayout from '../layout/LandingLayout.vue'
import TopMarket from '../components/Market/TopMarket.vue'

export default {
    name:'market',
    components: { 
        LandingLayout,
        TopMarket
    },
    data() {
      return {
      }
    }    
}
</script>