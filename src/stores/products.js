import Vue from 'vue'
import Vuex from 'vuex'
import * as crudMode from './crudMode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    mode: crudMode.CREATE,
    isValid: false,
    textSearch: '',
    currentPage: 1
  },
  getters: {
    mode: state => state.mode,
    isValid: state => state.isValid,
    product: state => state.product,
    products: state => state.products,
    textSearch: state => state.textSearch,
    currentPage: state => state.currentPage
  },
  mutations: {
    ADD_PRODUCTS (state, product) {
      state.products.push(product)
    },
    NEW_PRODUCT (state) {
      state.product = {}
    },
    GET_MODE (state) {
      return state.mode
    },
    GET_PRODUCT (state) {
      return state.product
    },
    GET_PRODUCTS (state) {
      return state.products
    },
    GET_ISVALID (state) {
      return state.isValid
    },
    GET_TEXTSEARCH (state) {
      return state.textSearch
    },
    GET_CURRENTPAGE (state) {
      return state.currentPage
    },
    SET_ISVALID (state, valid) {
      state.isValid = valid
    },
    SET_MODE (state, mode) {
      state.mode = mode
      if (mode.CREATE) {
        state.product = {}
      }
    },
    SET_PRODUCTS (state, products) {
      state.products = products
      console.log('state', state.products)
    },
    SET_TEXTSEARCH (state, textSearch) {
      state.textSearch = textSearch
      console.log('state', state.textSearch)
    },
    SET_CURRENTPAGE (state, page) {
      state.currentPage = page
    }
  },
  actions: {
    addProducts ({commit}, product) {
      commit('ADD_PRODUCTS', product)
    },
    getProduct ({commit}) {
      commit('GET_PRODUCT')
    },
    getProducts ({commit}) {
      commit('GET_PRODUCTS')
    },
    getMode ({commit}) {
      commit('GET_MODE')
    },
    getIsValid ({commit}) {
      commit('GET_ISVALID')
    },
    getTextSearch ({commit}) {
      commit('GET_TEXTSEARCH')
    },
    getCurrentPage ({commit}) {
      commit('GET_CURRENTPAGE')
    },
    newProduct ({commit}) {
      commit('NEW_PRODUCT')
    },
    setMode ({commit}, mode) {
      commit('SET_MODE', mode)
    },
    setIsValid ({commit}, valid) {
      commit('SET_ISVALID', valid)
    },
    setProducts ({commit}, products) {
      commit('SET_PRODUCTS', products)
    },
    setTextSearch ({commit}, textSearch) {
      commit('SET_TEXTSEARCH', textSearch)
    },
    setCurrentPage ({commit}, page) {
      commit('SET_CURRENTPAGE', page)
    }
  }
})
