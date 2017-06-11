var config = require('../config')
module.exports = function () {
  var _self = this

  function setOptions (options, db) {
    for (var k in options) {
      if (db.hasOwnProperty(k)) {
        db[k] = options[k]
      }
    }
  }

  _self.init = function (opts) {
    _self.MongoClient = require('mongodb').MongoClient
    _self.url = config.dev.facemindMongoDB
    _self.collection = ''
    _self.results = {}
    _self.errors = []
    setOptions(opts, _self)
    _self.isConnected = true
  }
}
