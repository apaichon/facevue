// import restApi from '@/classes/restApi'
import restApi from '@/classes/restApi'
import config from '../../config'

var host = config.dev.facemindApiHost
var urls = {
  ADD_PRODUCTS: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/add`,
  GET_PRODUCTS: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/gets`,
  UPDATE_PRODUCT: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/edit`,
  REMOVE_PRODUCT: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/remove`
}

export default {
  methods: {
    addProducts: (products) => {
      return restApi.post(urls.ADD_PRODUCTS, products)
    },
    getProducts: (condition) => {
      return restApi.post(urls.GET_PRODUCTS, condition)
    },
    updateProduct: (condition) => {
      return restApi.post(urls.UPDATE_PRODUCT, condition)
    },
    removeProduct: (condition) => {
      return restApi.post(urls.REMOVE_PRODUCT, condition)
    }
  }
}
