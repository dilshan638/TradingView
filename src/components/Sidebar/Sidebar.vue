<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white sidebar">
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#" class="nav-link active text-white">
                    Dashboard
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    Wallet
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    Orders
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    Security
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    Setting
                </a>
            </li>            
            <li>
                <a href="#" class="nav-link text-white">
                    REfeeral
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
name:'sidebar'
}
</script>

<style lang="scss" scoped>
  @import "Sidebar.scss"
</style>