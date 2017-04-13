import $ from 'jquery'
export default {
  post: (url, data) => {
    return $.post(url, data)
  }
}
