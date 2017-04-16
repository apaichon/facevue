import axios from 'axios'
// import $ from 'jquery'

export default {
  post: (url, data) => {
    return axios.post(url, data)
  }
}
