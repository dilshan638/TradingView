<template>
  <landing-layout>
    <div class="container mt-5">
      <div class="row">
          <div class="col-md-12">
            <top-market />
          </div>
      </div>      
    </div>
    <markets />
  </landing-layout>
</template>

<script>
import LandingLayout from '../layout/LandingLayout.vue'
import TopMarket from '../components/Market/TopMarket.vue'
import Markets from '../components/Market/Markets.vue'

export default {
    name:'market',
    components: { 
        LandingLayout,
        TopMarket,
        Markets
    },
    data() {
      return {
      }
    }    
}
</script>