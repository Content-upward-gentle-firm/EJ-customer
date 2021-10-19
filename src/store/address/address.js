import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    address: []
  },
  mutations: {
    SET_ADDRESS (state, payload) {
      state.address = payload
    }
  },
  actions: {
    async findAddress ({ commit }, userId) {
      let res = await get('/address/pageQuery', {
        page: 1,
        pageSize: 100,
        userId
      })
      commit('SET_ADDRESS', res.data.data.list)
    }
  }
}