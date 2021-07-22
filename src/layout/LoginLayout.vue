<template>
    <PageContent>
        <slot />
    </PageContent>
    <Footer />
</template>

<script>
import PageContent from '../components/PageContent/PageContent.vue'

export default {
    name: 'LoginLayout',
    components: {
        PageContent
    }
}
</script>

<style>
    @import "../assets/scss/layout/loginlayout.scss";
</style>