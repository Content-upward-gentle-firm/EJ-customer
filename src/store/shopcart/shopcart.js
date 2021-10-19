import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    orderLines: new Map()
  },
  getters: {
    total (state) {
      let result = 0
      Array.from(state.orderLines.values()).forEach(orderLine => {
        result += orderLine.price * orderLine.number
      })
      return result
    }
  },
  mutations: {
    // 添加购物车
    addShopCar (state, orderline) {
      state.orderLines.set(orderline.productId, orderline)
      // 通过使用clone方法，改变引用地址，让Vue能够监听到内部值的改变
      state.orderLines = _.clone(state.orderLines)
    },
    // 置空购物车
    clearShopCar (state) {
      state.orderLines.clear();
      // 通过使用clone方法，改变引用地址，让Vue能够监听到内部值的改变
      state.orderLines = _.clone(state.orderLines)
    }
  },
  actions: {

  }
}