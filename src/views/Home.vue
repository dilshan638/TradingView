<template>
  <landing-layout class="homepage">
    <div class="content-area home">
      <block-one />
      <block-two />
      <block-three />
       <block-four />
    </div>
  </landing-layout>
</template>

<script>
import LandingLayout from '../layout/LandingLayout.vue'
import BlockOne from '../components/Home/BlockOne.vue'
import BlockTwo from '../components/Home/BlockTwo.vue'
import BlockThree from '../components/Home/BlockThree.vue'
import BlockFour from '../components/Home/BlockFour.vue'

export default {
    name:'market',
    components: { 
        LandingLayout,
        BlockOne,
        BlockTwo,
        BlockThree,
        BlockFour
    },
    data() {
      return {
      }
    }    
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/Home/Home";
</style>