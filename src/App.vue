<template>
<div>
 <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
<style>
  
</style>
