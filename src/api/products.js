// import restApi from '@/classes/restApi'
import fetchApi from '@/classes/fetchApi'
import config from '../../config'

var host = config.dev.facemindApiHost
var urls = {
  ADD_PRODUCTS: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/add`,
  GET_PRODUCTS: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/getAll`,
  UPDATE_PRODUCT: `${host.protocol}/${host.name}:${host.port}/api/masterdata/products/update`
}

export default {
  methods: {
    addProducts: (products) => {
      return fetchApi.post(urls.ADD_PRODUCTS, products)
    },
    getProducts: (condition) => {
      return fetchApi.post(urls.GET_PRODUCTS, condition)
    },
    updateProduct: (condition) => {
      return fetchApi.post(urls.UPDATE_PRODUCT, condition)
    }
  }
}
