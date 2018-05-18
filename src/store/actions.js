/*
包含多个通过mutation间接更新state的方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops} from '../api'
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
  }
}
