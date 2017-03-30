<template>
  <div id="app">
  
    <div class="ui grid">
      <div class="row">
        <topmenu> </topmenu>
      </div>
      <div class="row">
        <sidemenu> </sidemenu>
      </div>
      <div class="row">
         <div class="ui container">
        <router-view></router-view>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import topmenu from './components/TopMenu'
import sidemenu from './components/SideMenu'
import semantic from 'semantic'

export default {
  name: 'app',
  components: {
    topmenu, sidemenu, semantic
  }
}
</script>
