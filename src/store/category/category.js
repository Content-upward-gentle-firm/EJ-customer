import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    }
  },
  actions: {
    async findAllCategories ({ commit }) {
      let res = await get('/productCategory/pageQuery', {
        page: 1,
        pageSize: 10
      })
      commit('SET_CATEGORIES', res.data.data.list)
    }
  }
}