<template>
  <div class="main-area">
       <Header />
       <sidebar />
       <PageContent>
           <slot />
       </PageContent>
       <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer/Footer.vue'
import Header from '../components/Header/Header.vue'
import sidebar from '../components/Sidebar/Sidebar.vue'
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'DefaultLayout',
    components: {
        Header,
        sidebar,
        PageContent,
        Footer
    }
}
</script>

<style scoped>
</style>