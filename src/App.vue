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
      this.getAddress()
    },
    components: {
      FooterGuide
    },
    methods: {
      ...mapActions(['getAddress'])
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
