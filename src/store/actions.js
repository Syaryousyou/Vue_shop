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
  RECEIVE_SHOPINFO
} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops, reqUserInfo, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo} from '../api'
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
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOPGOODS, {shopGoods})
    }
    callback && callback()
  },
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOPRATINGS, {shopRatings})
    }
  },
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOPINFO, {shopInfo})
    }
  }
}
