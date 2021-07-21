<template>
    <Header />
    <PageContent>
        <slot />
    </PageContent>
    <Footer />
</template>

<script>
import Footer from '../components/Footer/Footer.vue'
import Header from '../components/Header/Header.vue'
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'LoginLayout',
    components: {
        Header,
        PageContent,
        Footer
    }
}
</script>