// import restApi from '@/classes/restApi'
import restApi from '@/classes/restApi'
import config from '../../config'

var host = config.dev.facemindApiHost
var urls = {
  ADD_PRODUCT_CATEGORIES: `${host.protocol}/${host.name}:${host.port}/api/masterdata/productCategories/add`,
  GET_PRODUCT_CATEGORIES: `${host.protocol}/${host.name}:${host.port}/api/masterdata/productCategories/gets`,
  UPDATE_PRODUCT_CATEGORY: `${host.protocol}/${host.name}:${host.port}/api/masterdata/productCategories/edit`,
  REMOVE_PRODUCT_CATEGORY: `${host.protocol}/${host.name}:${host.port}/api/masterdata/productCategories/remove`
}

export default {
  methods: {
    addProductCategories: (productCategories) => {
      return restApi.post(urls.ADD_PRODUCT_CATEGORIES, productCategories)
    },
    getProductCategories: (condition) => {
      return restApi.post(urls.GET_PRODUCT_CATEGORIES, condition)
    },
    updateProductCategory: (condition) => {
      return restApi.post(urls.UPDATE_PRODUCT_CATEGORY, condition)
    },
    removeProductCategory: (condition) => {
      return restApi.post(urls.REMOVE_PRODUCT_CATEGORY, condition)
    }
  }
}
