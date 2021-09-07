<template>
    <div class="time-socket">Resend OTP in 0:0:{{ timerCount }}</div>
</template>

<script>

    export default {

        data() {
            return {
                timerCount: 60
            }
        },

        watch: {

            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        }
    }

</script>
<style lang="scss" scoped>
//   @import "../../assets/scss/Timer/";
</style>