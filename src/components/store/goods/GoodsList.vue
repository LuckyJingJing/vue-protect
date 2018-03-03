<template>
  <div>
    <!-- 我们把商品列表这个组件也分为两个组件，一个是列表的头部，一个是主体部分 -->
    <listtop></listtop>
    <listmain></listmain>
  </div>
</template>

<script>
  import listtop from './common/ListTop.vue'
  import listmain from './common/ListMain.vue'

  export default {
    components: {
      listtop,
      listmain
    }
  }
</script>

<style>
</style>
