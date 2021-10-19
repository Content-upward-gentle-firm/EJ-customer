/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 21:53:55
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-14 01:48:54
 */
import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {
    SET_ORDERS (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async findOrders ({ commit }, userId) {
      let res = await get('/order/pageQuery', {
        page: 1,
        pageSize: 100,
        userId
      })
      commit('SET_ORDERS', res.data.data.list)
    }
  }
}