import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    async findProducts ({ commit }, productCategoryId) {
      let res = await get('/product/pageQuery', {
        page: 1,
        pageSize: 100,
        productCategoryId
      })
      commit('SET_PRODUCTS', res.data.data.list)
    }
  }
}