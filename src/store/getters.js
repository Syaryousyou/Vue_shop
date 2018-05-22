// 包含多个基于state的getter计算属性对象模块
export default {
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },
  positiveSize (state) {
    return state.shopRatings.reduce((pre, rating) => pre + (rating.rateType ? 0 : 1), 0)
  }
}
