<template>
  <div>
    <custom-slider min="10" max="50" step="2" raising v-model="slider" />
    {{ slider }}
  </div>
</template>

<script>
  import CustomSlider from "vue-custom-range-slider";
  // import the styling, css or scss
  import "vue-custom-range-slider/dist/vue-custom-range-slider.css";

  export default {
    components: {
      CustomSlider
    },
    data() {
      return {
        slider: "12"
      };
    }
  };
</script>