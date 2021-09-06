<template>
    <PageContent class="login-layout">
        <slot />
    </PageContent>
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

<style lang="scss" scoped>
    @import "../assets/scss/layout/loginlayout";
</style>