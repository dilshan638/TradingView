<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>
      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header"/>  
          <i class="ri-close-line" @click="closeModal()"></i>
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
  name: "Modal",
  data() {
    return {
      show: false,
      formreset: false
    };
  },
  methods: {
    closeModal() {
      document.querySelector("body").classList.remove("open-modal");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("open-modal");
    }
  }
};
</script>