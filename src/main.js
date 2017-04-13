// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/semantic-ui-css/semantic.min.css'
<<<<<<< HEAD
// import '../node_modules/jquery/dist/jquery.min.js'
import $ from '../node_modules/jquery/dist/jquery.min.js'
=======
import '!script-loader!../node_modules/jquery/dist/jquery.min.js'
>>>>>>> bf25377a816ea894763c17f142bc8584c030e4d8
// import Vuetify from 'vuetify'
// Vue.use(Vuetify)
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
