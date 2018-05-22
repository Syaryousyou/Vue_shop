// import moment from 'moment'
// 通过打包可视化发现moment太大，使用轻量级的日期库date-fns
import format from 'date-fns/format'
import Vue from 'vue'
Vue.filter('dateString', function (value, formatStr) {
  // return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
  return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss')
})
