<template>
  <div class="trade-area">
       <Header />
       <PageContent>
           <slot />
       </PageContent>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'TradeLayout',
    components: {
        Header,
        PageContent
    }
}
</script>

<style scoped>
</style>