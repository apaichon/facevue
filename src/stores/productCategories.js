import Vue from 'vue'
import Vuex from 'vuex'
import * as crudMode from './crudMode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productCategories: [],
    productCategory: {},
    mode: crudMode.CREATE,
    isValid: false,
    textSearch: '',
    currentPage: 1
  },
  getters: {
    mode: state => state.mode,
    isValid: state => state.isValid,
    productCategory: state => state.productCategory,
    productCategories: state => state.productCategories,
    textSearch: state => state.textSearch,
    currentPage: state => state.currentPage
  },
  mutations: {
    ADD_PRODUCT_CATEGORIS (state, productCategory) {
      state.productCategories.push(productCategory)
    },
    NEW_PRODUCT_CATEGORY (state) {
      state.product = {}
    },
    GET_MODE (state) {
      return state.mode
    },
    GET_PRODUCT_CATEGORY (state) {
      return state.productCategory
    },
    GET_PRODUCT_CATEGORIES (state) {
      return state.productCategories
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
        state.productCategory = {}
      }
    },
    SET_PRODUCT_CATEGORIES (state, productCategories) {
      state.productCategories = productCategories
      // console.log('state', state.productCategories)
    },
    SET_TEXTSEARCH (state, textSearch) {
      state.textSearch = textSearch
      // console.log('state', state.textSearch)
    },
    SET_CURRENTPAGE (state, page) {
      state.currentPage = page
    }
  },
  actions: {
    addProductCateories ({commit}, productCategory) {
      commit('ADD_PRODUCT_CATEGORIS', productCategory)
    },
    getProductCategory ({commit}) {
      commit('GET_PRODUCT_CATEGORY')
    },
    getProductCategories ({commit}) {
      commit('GET_PRODUCT_CATEGORIES')
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
    newProductCategory ({commit}) {
      commit('NEW_PRODUCT_CATEGORY')
    },
    setMode ({commit}, mode) {
      commit('SET_MODE', mode)
    },
    setIsValid ({commit}, valid) {
      commit('SET_ISVALID', valid)
    },
    setProductCategories ({commit}, productCategories) {
      commit('SET_PRODUCT_CATEGORIES', productCategories)
    },
    setTextSearch ({commit}, textSearch) {
      commit('SET_TEXTSEARCH', textSearch)
    },
    setCurrentPage ({commit}, page) {
      commit('SET_CURRENTPAGE', page)
    }
  }
})
