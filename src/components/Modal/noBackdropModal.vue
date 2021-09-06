<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header"/>  
        </div>
        <div class="modal__body">
          <slot name="body"/>
        </div>
        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "nobackdropmodal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("open-modal");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("open-modal");
    }
  }
};
</script>
<style lang="scss">
    @import "../../assets/scss/Modal/Modal";
</style>