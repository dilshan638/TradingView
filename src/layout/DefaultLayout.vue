<template>
  <div>
       <Header />
       <PageContent>
           <slot />
       </PageContent>
       <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer/Footer.vue'
import Header from '../components/Header/Header.vue'
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'DefaultLayout',
    components: {
        Header,
        PageContent,
        Footer
    }
}
</script>