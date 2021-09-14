<template>
  <div class="main-area after-login">
       <Header :currentpage="page" />
       <sidebar />
       <PageContent>
           <slot />
       </PageContent>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import sidebar from '../components/Sidebar/Sidebar.vue'
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'DefaultLayout',
    components: {
        Header,
        sidebar,
        PageContent
    },
    data() {
        return{
            currentpage: ''
        }
    }
}
</script>

<style scoped>
</style>