import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    ADD_PRODUCTS (state, product) {
      state.products.push(product)
    }
  },
  actions: {
    addProducts ({commit}, product) {
      commit('ADD_PRODUCTS', product)
    },
    getProducts ({commit}) {
      commit('GET_PRODUCTS')
    }
  }
})
