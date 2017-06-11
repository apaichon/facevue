import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ProductCategory from '@/pages/ProductCategory'
import TestPage from '../pages/TestPage'
import MasterPage from '../pages/MasterPage'
import LoginPage from '../pages/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/productCategory',
      name: 'ProductCategory',
      component: ProductCategory
    },
    {
      path: '/testpage',
      name: 'testpage',
      component: TestPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/masterpage',
      name: 'masterpage',
      component: MasterPage
    }
  ]
})
