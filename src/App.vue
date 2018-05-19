<template>
  <div id="app">
    <router-view/>
    <footer-guide v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  export default {
    mounted () {
      /* 在组件中调用actions的两种方式 */
      // 第一种直接在用this.$store.dispatch('actionName')
      // this.$store.dispatch('getAddress')

      // 第二种在methods中，通过vuex的mapActions方法，将
      // 对应的action映射为method，调用该method
      this.getAddress()
      this.$store.dispatch('getUserInfo')
    },
    components: {
      FooterGuide
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
