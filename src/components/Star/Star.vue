<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(c, index) in Sclasses" :key="index" :class="c"></span>
  </div>
</template>
<script>
  const classOn = 'on'
  const classHalf = 'half'
  const classOff = 'off'
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      Sclasses () {
        // 设置一个空数组
        let arr = []
        const {score} = this
        // 获取score的整数部分，确定on的个数
        const scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          arr.push(classOn)
        }
        // 判断score的小数部分是否大于等于0.5来确定是否需要half
        // 因为小数的计算不准确，所以乘以10
        if (score * 10 - scoreInteger * 10 >= 5) {
          arr.push(classHalf)
        }
        // 当arr的长度小于5时，添加off
        while (arr.length < 5) {
          arr.push(classOff)
        }
        return arr
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
