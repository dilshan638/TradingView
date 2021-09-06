<template>
  <permission-layout>
      <permission-modal />
  </permission-layout>
</template>

<script>

import PermissionLayout from '../layout/PermissionLayout.vue';
import PermissionModal from '../components/Permission/PermissionModal.vue';

export default {
    components: {
        PermissionLayout,
        PermissionModal
    }
}
</script>

<style>

</style>