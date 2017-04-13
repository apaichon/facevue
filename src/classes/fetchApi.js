export default function () {
  const fecthTypes = () => {
    return {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    }
  }
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const get = (url) => {
    var config = {
      method: fecthTypes.GET,
      header: header,
      mode: 'cors',
      cache: 'default'
    }
    var myRequest = new Request(url, config)
    return fetch(myRequest)
  }

  const post = (url, body) => {
    var config = {
      method: fecthTypes.POST,
      header: header,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body)
    }
    // console.log('body', body)
    var myRequest = new Request(url, config)
    return fetch(myRequest)
  }

  const put = (url, body) => {
    var config = {
      method: fecthTypes.PUT,
      header: header,
      mode: 'cors',
      cache: 'default',
      body: body
    }
    var myRequest = new Request(url, config)
    return fetch(myRequest)
  }

  const del = (url, body) => {
    var config = {
      method: fecthTypes.DELETE,
      header: header,
      mode: 'cors',
      cache: 'default',
      body: body
    }
    var myRequest = new Request(url, config)
    return fetch(myRequest)
  }

  return {
    get: get,
    post: post,
    put: put,
    del: del
  }
}
