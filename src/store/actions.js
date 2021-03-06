/*
包含多个通过mutation间接更新state的方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  RECEIVE_SHOPINFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_FOOD_CONT,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops, reqUserInfo, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo, reqSearchShops} from '../api'
export default {
  // 异步获取地址函数
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  async getCategorys ({commit, state}) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  restoreUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  async logOut ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  },
  async getShopGoods ({commit}, callback) {
    // console.log('----')
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOPGOODS, {shopGoods})
      callback && callback()
    }
  },
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOPRATINGS, {shopRatings})
      callback && callback()
    }
  },
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOPINFO, {shopInfo})
    }
  },
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  clearCart ({commit}) {
    commit(CLEAR_FOOD_CONT)
  },
  async getSearchShops ({commit, state}, keyWord) {
    const {latitude, longitude} = state
    const geohash = latitude + ',' +longitude
    const result = await reqSearchShops(geohash, keyWord)
    if (result.code === 0) {
      commit(RECEIVE_SEARCH_SHOPS, {searchShops:result.data})
    }
  }
}
