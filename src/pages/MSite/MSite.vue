<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left" @click="$router.push('/search')">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" @click="$router.push(!userInfo._id ? '/login' : '/userinfo')">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="categoryArr.length">
          <div class="swiper-slide" v-for="(category, index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in category" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <img v-else src="./images/msite_back/msite_back.svg" alt="back">
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/js/swiper.min'
  import 'swiper/dist/css/swiper.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed: {
      ...mapState(['address', 'categorys', 'userInfo']),
      // 二维数组
      categoryArr () {
        // 准备空的二维数组
        let arr = []
        // 准备空的小数组(最大长度为8)
        let minArr = []
        const max = 8
        // 遍历请求拿到的列表
        this.categorys.forEach((category, index) => {
          // 如果小数组是空的，将小数组保存到大数组中
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(category)
          // 当小数组长度为8后，创建一个新的数组
          if (minArr.length === max) {
            minArr = []
          }
        })
        return arr
      }
    },
    watch: {
      categorys (value) { // categorys数组中有数据了, 在异步更新界面之前执行
        // 使用setTimeout可以实现效果, 但不是太好
        /* setTimeout(() => {
         // 创建一个Swiper实例对象, 来实现轮播
         new Swiper('.swiper-container', {
           loop: true, // 可以循环轮播
           // 如果需要分页器
           pagination: {
             el: '.swiper-pagination',
           },
         })
       }, 100) */
        // 界面更新就立即创建swiper对象
        /* eslint-disable no-new */
        this.$nextTick(() => { // 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
