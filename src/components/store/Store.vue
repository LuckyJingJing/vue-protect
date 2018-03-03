<template>
  <div>
    <fHeader></fHeader>
    <router-view></router-view>
    <fFooter></fFooter>
  </div>
</template>

<script>
  import fHeader from './common/Header.vue'
  import fFooter from './common/Footer.vue'
  export default {
    components: {
      fHeader,
      fFooter
    }
  }
</script>

<style>
</style>
